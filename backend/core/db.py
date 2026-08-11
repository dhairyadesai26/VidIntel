import os
import json
import hashlib
from dotenv import load_dotenv
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.query import Query
from appwrite.exception import AppwriteException

load_dotenv(override=True)

APPWRITE_ENDPOINT = os.getenv("APPWRITE_ENDPOINT", "https://fra.cloud.appwrite.io/v1")
APPWRITE_PROJECT_ID = os.getenv("APPWRITE_PROJECT_ID")
APPWRITE_API_KEY = os.getenv("APPWRITE_API_KEY")
APPWRITE_DATABASE_ID = os.getenv("APPWRITE_DATABASE_ID")
APPWRITE_COLLECTION_ID = os.getenv("APPWRITE_COLLECTION_ID", "analyses")

client = Client()
if APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID and APPWRITE_API_KEY:
    client.set_endpoint(APPWRITE_ENDPOINT)
    client.set_project(APPWRITE_PROJECT_ID)
    client.set_key(APPWRITE_API_KEY)

databases = Databases(client)

def generate_source_id(source: str) -> str:
    """Generate a unique string ID based on the URL or file path."""
    return hashlib.md5(source.encode()).hexdigest()

def get_cached_analysis(source: str):
    """
    Check if an analysis for this source already exists in Appwrite.
    Returns the parsed document dictionary, or None if not found.
    """
    if not APPWRITE_API_KEY:
        return None # Gracefully skip if Appwrite isn't configured

    source_id = generate_source_id(source)
    try:
        response = databases.list_documents(
            database_id=APPWRITE_DATABASE_ID,
            collection_id=APPWRITE_COLLECTION_ID,
            queries=[Query.equal("source_id", source_id)]
        )
        if response.total > 0:
            doc = response.documents[0]
            
            # Reconstruct the result dictionary (parsing JSON strings back to lists)
            result = {
                "title": doc.data.get("title", ""),
                "transcript": doc.data.get("transcript", ""),
                "summary": doc.data.get("summary", ""),
                "action_items": json.loads(doc.data.get("action_items", "[]")),
                "key_decisions": json.loads(doc.data.get("key_decisions", "[]")),
                "open_questions": json.loads(doc.data.get("open_questions", "[]"))
            }
            return result
    except AppwriteException as e:
        print(f"Appwrite get_cached_analysis Error: {e}")
    except Exception as e:
        print(f"Error parsing cache: {e}")
        
    return None

def save_analysis(source: str, result: dict):
    """
    Save the analysis result to Appwrite.
    """
    if not APPWRITE_API_KEY:
        return

    source_id = generate_source_id(source)
    try:
        # Convert list attributes to JSON strings to fit the string attribute schema
        action_items_str = json.dumps(result.get("action_items", []))
        key_decisions_str = json.dumps(result.get("key_decisions", []))
        open_questions_str = json.dumps(result.get("open_questions", []))

        databases.create_document(
            database_id=APPWRITE_DATABASE_ID,
            collection_id=APPWRITE_COLLECTION_ID,
            document_id="unique()",
            data={
                "source_id": source_id,
                "title": result.get("title", "Untitled"),
                "transcript": result.get("transcript", ""),
                "summary": result.get("summary", ""),
                "action_items": action_items_str,
                "key_decisions": key_decisions_str,
                "open_questions": open_questions_str
            }
        )
        print(f"Successfully cached analysis for source: {source}")
    except AppwriteException as e:
        print(f"Appwrite save_analysis Error: {e}")

def get_all_analyses(limit: int = 50, offset: int = 0):
    if not APPWRITE_API_KEY:
        return []
    try:
        response = databases.list_documents(
            database_id=APPWRITE_DATABASE_ID,
            collection_id=APPWRITE_COLLECTION_ID,
            queries=[Query.limit(limit), Query.offset(offset), Query.order_desc("$createdAt")]
        )
        results = []
        for doc in response.documents:
            results.append({
                "id": doc.id,
                "title": doc.data.get("title", "Untitled"),
                "summary": doc.data.get("summary", ""),
                "created_at": doc.createdat
            })
        return results
    except AppwriteException as e:
        print(f"Appwrite get_all_analyses Error: {e}")
        return []

def get_analysis_by_id(doc_id: str):
    if not APPWRITE_API_KEY:
        return None
    try:
        doc = databases.get_document(
            database_id=APPWRITE_DATABASE_ID,
            collection_id=APPWRITE_COLLECTION_ID,
            document_id=doc_id
        )
        result = {
            "id": doc.id,
            "title": doc.data.get("title", ""),
            "transcript": doc.data.get("transcript", ""),
            "summary": doc.data.get("summary", ""),
            "action_items": json.loads(doc.data.get("action_items", "[]")),
            "key_decisions": json.loads(doc.data.get("key_decisions", "[]")),
            "open_questions": json.loads(doc.data.get("open_questions", "[]")),
            "created_at": doc.createdat
        }
        return result
    except AppwriteException as e:
        print(f"Appwrite get_analysis_by_id Error: {e}")
        return None

