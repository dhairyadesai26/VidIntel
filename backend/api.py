from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import json
import asyncio
from pydantic import BaseModel
from typing import Optional

# Import local AI pipeline functions

bin_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "bin"))
os.environ["PATH"] = bin_dir + os.pathsep + os.environ.get("PATH", "")

from dotenv import load_dotenv
load_dotenv(override=True)

from utils.audio_processor import process_input
from core.transcriber import transcribe_all
from core.summarize import summarize, generate_title
from core.extractor import extract_action_items, extract_key_decisions, extract_questions
from core.rag_engine import build_rag_chain, ask_question
from core.db import get_cached_analysis, save_analysis, get_all_analyses, get_analysis_by_id

app = FastAPI(title="VidIntel API")

# Add CORS middleware to allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global in-memory storage for RAG chain (since we are not using a database for now)
# In production, use a persistent vector DB and session IDs.
session_store = {}

@app.post("/api/process")
async def process_video(
    source_url: str = Form(None),
    file: UploadFile = File(None),
    language: str = Form("english")
):
    if not source_url and not file:
        raise HTTPException(status_code=400, detail="Must provide either a source URL or upload a file.")

    async def generate_progress():
        try:
            source = source_url
            if file:
                # Save uploaded file temporarily
                os.makedirs("downloads", exist_ok=True)
                source = f"downloads/{file.filename}"
                with open(source, "wb") as buffer:
                    buffer.write(await file.read())

            # 1. Check Cache First
            yield f"data: {json.dumps({'status': 'downloading', 'message': 'Checking cache...'})}\n\n"
            await asyncio.sleep(0.1)
            cached_result = await asyncio.to_thread(get_cached_analysis, source)
            
            if cached_result:
                yield f"data: {json.dumps({'status': 'indexing', 'message': 'Found cached analysis! Rebuilding search index...'})}\n\n"
                await asyncio.sleep(0.1)
                
                # Rebuild RAG index using the cached transcript
                rag_chain = await asyncio.to_thread(build_rag_chain, cached_result["transcript"])
                session_store["default"] = rag_chain
                
                yield f"data: {json.dumps({'status': 'complete', 'result': cached_result})}\n\n"
                return # Exit early

            yield f"data: {json.dumps({'status': 'downloading', 'message': 'Processing input source...'})}\n\n"
            await asyncio.sleep(0.1) # Yield to event loop
            chunks = await asyncio.to_thread(process_input, source)

            yield f"data: {json.dumps({'status': 'transcribing', 'message': f'Transcribing {len(chunks)} chunk(s)...'})}\n\n"
            await asyncio.sleep(0.1)
            # Transcribe all (this might block, ideally we run it in a thread pool)
            transcript = await asyncio.to_thread(transcribe_all, chunks, language)

            yield f"data: {json.dumps({'status': 'analyzing', 'message': 'Generating title and summary...'})}\n\n"
            await asyncio.sleep(0.1)
            title = await asyncio.to_thread(generate_title, transcript)
            summary = await asyncio.to_thread(summarize, transcript)

            yield f"data: {json.dumps({'status': 'extracting', 'message': 'Extracting action items, decisions, and questions...'})}\n\n"
            await asyncio.sleep(0.1)
            action_items = await asyncio.to_thread(extract_action_items, transcript)
            decisions = await asyncio.to_thread(extract_key_decisions, transcript)
            questions = await asyncio.to_thread(extract_questions, transcript)

            yield f"data: {json.dumps({'status': 'indexing', 'message': 'Building search index...'})}\n\n"
            await asyncio.sleep(0.1)
            rag_chain = await asyncio.to_thread(build_rag_chain, transcript)

            # Store the RAG chain globally for the chat endpoint (using a fixed session ID "default" for now)
            session_store["default"] = rag_chain

            result = {
                "title": title,
                "transcript": transcript,
                "summary": summary,
                "action_items": action_items,
                "key_decisions": decisions,
                "open_questions": questions
            }

            # Cache the result in Appwrite
            await asyncio.to_thread(save_analysis, source, result)

            yield f"data: {json.dumps({'status': 'complete', 'result': result})}\n\n"

        except Exception as e:
            import traceback
            traceback.print_exc()
            yield f"data: {json.dumps({'status': 'error', 'message': str(e)})}\n\n"

    return StreamingResponse(generate_progress(), media_type="text/event-stream")


class ChatRequest(BaseModel):
    question: str
    session_id: str = "default"

@app.post("/api/chat")
async def chat_with_video(request: ChatRequest):
    rag_chain = session_store.get(request.session_id)
    if not rag_chain:
        raise HTTPException(status_code=400, detail="No active session found. Please process a video first.")
    
    try:
        # Run synchronous RAG chain in thread
        answer = await asyncio.to_thread(ask_question, rag_chain, request.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history")
async def get_history(limit: int = 50, offset: int = 0):
    try:
        analyses = await asyncio.to_thread(get_all_analyses, limit, offset)
        return {"history": analyses}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/{analysis_id}")
async def get_analysis(analysis_id: str):
    try:
        analysis = await asyncio.to_thread(get_analysis_by_id, analysis_id)
        if not analysis:
            raise HTTPException(status_code=404, detail="Analysis not found")
            
        # Re-initialize RAG chain so chat works when loading from history
        if analysis.get("transcript"):
            rag_chain = await asyncio.to_thread(build_rag_chain, analysis["transcript"])
            # Assuming 'default' session for now, ideally this would be session-specific
            session_store["default"] = rag_chain
            
        return {"analysis": analysis}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

