import os
import sys
from dotenv import load_dotenv
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException

# Ensure paths are correct when running this script
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(override=True)

APPWRITE_ENDPOINT = os.getenv("APPWRITE_ENDPOINT", "https://fra.cloud.appwrite.io/v1")
APPWRITE_PROJECT_ID = os.getenv("APPWRITE_PROJECT_ID")
APPWRITE_API_KEY = os.getenv("APPWRITE_API_KEY")
APPWRITE_DATABASE_ID = os.getenv("APPWRITE_DATABASE_ID")

if not APPWRITE_API_KEY:
    print("Error: APPWRITE_API_KEY is not set in your .env file.")
    print("Please generate an API key in your Appwrite console with the following scopes:")
    print("- databases.read\n- databases.write\n- collections.read\n- collections.write\n- attributes.read\n- attributes.write\n- indexes.read\n- indexes.write")
    sys.exit(1)

client = Client()
client.set_endpoint(APPWRITE_ENDPOINT)
client.set_project(APPWRITE_PROJECT_ID)
client.set_key(APPWRITE_API_KEY)

databases = Databases(client)

COLLECTION_ID = "analyses"

def init_appwrite():
    print(f"Connecting to Appwrite Project: {APPWRITE_PROJECT_ID}")
    print(f"Database ID: {APPWRITE_DATABASE_ID}")
    
    # 1. Create Collection
    try:
        print("Checking if collection exists...")
        databases.get_collection(database_id=APPWRITE_DATABASE_ID, collection_id=COLLECTION_ID)
        print("[OK] Collection 'analyses' already exists.")
    except AppwriteException as e:
        if e.code == 404:
            print("Creating collection 'analyses'...")
            databases.create_collection(
                database_id=APPWRITE_DATABASE_ID,
                collection_id=COLLECTION_ID,
                name="Video Analyses"
            )
            print("[OK] Collection created.")
        else:
            print(f"[ERROR] Error accessing collection: {e}")
            sys.exit(1)

    # 2. Create Attributes
    attributes = [
        {"type": "string", "key": "source_id", "size": 255, "required": True},
        {"type": "string", "key": "title", "size": 1000, "required": True},
        {"type": "string", "key": "transcript", "size": 1000000, "required": False},
        {"type": "string", "key": "summary", "size": 100000, "required": False},
        {"type": "string", "key": "action_items", "size": 100000, "required": False},
        {"type": "string", "key": "key_decisions", "size": 100000, "required": False},
        {"type": "string", "key": "open_questions", "size": 100000, "required": False},
    ]

    for attr in attributes:
        try:
            print(f"Creating attribute '{attr['key']}'...")
            databases.create_string_attribute(
                database_id=APPWRITE_DATABASE_ID,
                collection_id=COLLECTION_ID,
                key=attr['key'],
                size=attr['size'],
                required=attr['required']
            )
        except AppwriteException as e:
            if e.code == 409:
                print(f"[OK] Attribute '{attr['key']}' already exists.")
            else:
                print(f"[ERROR] Error creating attribute '{attr['key']}': {e}")
                
    print("Waiting for attributes to become available (this takes a few seconds)...")
    import time
    time.sleep(3)

    # 3. Create Index on source_id for fast lookups
    try:
        print("Creating index on 'source_id'...")
        databases.create_index(
            database_id=APPWRITE_DATABASE_ID,
            collection_id=COLLECTION_ID,
            key="idx_source_id",
            type="unique",
            attributes=["source_id"]
        )
        print("[OK] Index created.")
    except AppwriteException as e:
        if e.code == 409:
            print("[OK] Index already exists.")
        else:
            print(f"[ERROR] Error creating index: {e}")

    print("\nAppwrite Initialization Complete!")
    print("Make sure you add APPWRITE_COLLECTION_ID=\"analyses\" to your .env file!")
    
    # Auto-update .env
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    with open(env_path, "r") as f:
        content = f.read()
    if "APPWRITE_COLLECTION_ID" not in content:
        with open(env_path, "a") as f:
            f.write('\nAPPWRITE_COLLECTION_ID="analyses"\n')

if __name__ == "__main__":
    init_appwrite()
