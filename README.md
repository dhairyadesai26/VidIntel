<div align="center">
  <img src="https://img.icons8.com/nolan/96/video.png" alt="VidIntel Logo" width="80" />
  <h1>VidIntel 🧠🎥</h1>
  <p><strong>AI-Powered Video Intelligence — Extract insights from any video in seconds.</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a>
  </p>
</div>

---

## 📖 Overview

**VidIntel** is a full-stack, production-ready AI application that transforms long, tedious videos and meeting recordings into actionable knowledge. 

Instead of re-watching hours of footage, you can simply drop a YouTube link or upload a local file. Within minutes, VidIntel will transcribe the audio, generate executive summaries, extract key decisions, compile action items, and allow you to **chat directly with your video** to retrieve precise, context-aware answers.

Designed with a sleek, responsive, glassmorphism dark-mode UI, VidIntel feels like a premium SaaS product from day one.

---

## ✨ Key Features

- **📺 Universal Input**: Supports both public YouTube URLs and direct file uploads (MP4, MP3, WAV, M4A).
- **🎙️ State-of-the-art Transcription**: Uses **OpenAI's Whisper** (running completely locally via FFmpeg) to generate highly accurate transcripts with speaker diarization.
- **⚡ Smart Summarization**: Leverages the **Mistral AI** LLM to generate concise executive summaries.
- **🎯 Action Item Extraction**: Automatically pulls out "Next Steps", key decisions, and open questions from meeting contexts.
- **💬 RAG Video Chat**: Embeds transcripts into a local Vector Database, allowing you to seamlessly chat with the video. Ask questions and get cited, contextual answers instantly.
- **🎨 Premium UI/UX**: Built with React 19 and Vite. Features a custom dark-mode design system, CSS glassmorphism, micro-animations, and smooth routing via React Router v6.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (Premium Dark Mode, Glassmorphism, CSS Variables)
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **Transcription**: Whisper AI (Local execution)
- **Media Processing**: `yt-dlp` & `ffmpeg`
- **AI & LLM**: LangChain, Mistral AI (`mistral-small-latest`)
- **Vector Search / RAG**: Local FAISS/Chroma integration (LangChain)

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- **FFmpeg**: Must be installed and available in your system's PATH (or placed locally in a `bin` directory inside the project root).
- **Mistral API Key**: Required for the summarization and chat functionalities.

### 1. Clone the repository
```bash
git clone https://github.com/dhairyadesai26/VidIntel.git
cd VidIntel
```

### 2. Backend Setup
Create a virtual environment and install dependencies:
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r Requirements.txt
```

Create a `.env` file in the `backend/` directory and add your Mistral API key:
```env
MISTRAL_API_KEY="your_mistral_api_key_here"
WHISPER_MODEL="small"
```

Start the FastAPI server:
```bash
cd backend
uvicorn api:app --reload --port 8000
```
*The API will be available at `http://localhost:8000`.*

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```
*The web app will be available at `http://localhost:5173`.*

---

## 💡 How to Use

1. **Launch the App**: Open the frontend URL in your browser.
2. **Submit a Video**: Paste a YouTube URL or upload a local audio/video file.
3. **Wait for Processing**: VidIntel will download the audio, transcribe it locally via Whisper, and generate embeddings.
4. **Explore Insights**: Instantly view the executive summary, action items, and key decisions.
5. **Chat**: Use the chat interface to ask specific questions like *"What did John say about Q3 metrics?"*

---

## 🔒 Privacy & Data
- All transcriptions happen **locally** on your machine using Whisper AI. Your raw audio/video files are never sent to the cloud.
- Only the transcribed text is sent to the Mistral AI API for summarization and RAG chat.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
