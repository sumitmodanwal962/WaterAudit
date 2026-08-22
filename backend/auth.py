import os
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin
if not firebase_admin._apps:
    # Use the credentials file located in the backend directory
    cred_path = os.path.join(os.path.dirname(__file__), "firebase-credentials.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        print("WARNING: firebase-credentials.json not found. Firebase Admin SDK not initialized.")

def verify_firebase_token(token: str) -> dict:
    """
    Verifies a Firebase ID token and returns the decoded token payload.
    Raises ValueError if the token is invalid or expired.
    """
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise ValueError(f"Invalid Firebase token: {e}")
