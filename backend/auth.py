import os
import json
import base64
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

load_dotenv()

_firebase_initialized = False

# Initialize Firebase Admin
if not firebase_admin._apps:
    cred_path = os.path.join(os.path.dirname(__file__), "firebase-credentials.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        _firebase_initialized = True
        print("INFO: Firebase Admin SDK initialized successfully.")
    else:
        print("WARNING: firebase-credentials.json not found. Running in DEV mode (no token signature verification).")
else:
    _firebase_initialized = True


def _decode_jwt_payload_unverified(token: str) -> dict:
    """
    Decodes JWT payload WITHOUT verifying the signature.
    Only used in local dev mode when Firebase Admin is not initialized.
    """
    try:
        parts = token.split(".")
        if len(parts) != 3:
            raise ValueError("Invalid JWT format")
        # Add padding if necessary
        payload_b64 = parts[1] + "=" * (-len(parts[1]) % 4)
        payload_bytes = base64.urlsafe_b64decode(payload_b64)
        payload = json.loads(payload_bytes)
        # Map Firebase JWT claims to expected keys
        return {
            "uid": payload.get("user_id") or payload.get("sub"),
            "email": payload.get("email"),
            "email_verified": payload.get("email_verified", False),
        }
    except Exception as e:
        raise ValueError(f"Failed to decode token: {e}")


def verify_firebase_token(token: str) -> dict:
    """
    Verifies a Firebase ID token and returns the decoded token payload.
    In production: uses Firebase Admin SDK for full cryptographic verification.
    In dev (no credentials file): decodes payload without signature verification.
    Raises ValueError if the token is invalid.
    """
    if _firebase_initialized:
        try:
            decoded_token = auth.verify_id_token(token)
            return decoded_token
        except Exception as e:
            raise ValueError(f"Invalid Firebase token: {e}")
    else:
        # DEV MODE: decode without signature verification
        print("DEV MODE: Skipping Firebase token signature verification.")
        return _decode_jwt_payload_unverified(token)

