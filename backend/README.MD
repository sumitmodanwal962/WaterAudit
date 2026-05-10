# Adding FastAPI Backend and PostgreSQL for Authentication

This plan outlines the steps to build a real Python-based backend using **FastAPI** and **PostgreSQL**, and wire it up to your existing Next.js frontend login page.

## User Review Required

> [!IMPORTANT]
> **PostgreSQL Setup**: To proceed, you will need to have a PostgreSQL database running locally (or have a connection string to a remote PostgreSQL database). 
> 
> If you do not have PostgreSQL installed, please let me know and I can provide instructions for setting it up via Docker or local installation. For this plan, I will assume a default local connection string: `postgresql://postgres:postgres@localhost:5432/wateraudit`

## Open Questions
1. Do you already have a PostgreSQL database server running on your machine? If so, what is the connection URL?
2. How would you like to handle session management in Next.js? (e.g. standard JWT stored in `localStorage`, HTTP-only cookies, or a library like `next-auth`)? *For simplicity, this plan defaults to standard JWT in localStorage.*

## Proposed Changes

### Backend (FastAPI)

#### [NEW] `backend/requirements.txt`
Dependencies for the backend:
- `fastapi` (web framework)
- `uvicorn` (ASGI server)
- `sqlalchemy` (ORM)
- `psycopg2-binary` (PostgreSQL driver)
- `passlib[bcrypt]` (Password hashing)
- `python-jose[cryptography]` (JWT token generation)
- `pydantic` (Data validation)

#### [NEW] `backend/database.py`
- SQLAlchemy database connection setup and base declarative class.

#### [NEW] `backend/models.py`
- SQLAlchemy `User` model with fields: `id`, `email`, `hashed_password`, `is_active`.
- Pydantic models for request/response validation (`UserCreate`, `UserLogin`, `Token`).

#### [NEW] `backend/auth.py`
- Helper functions for password hashing (bcrypt), verifying passwords, and generating JWT tokens.

#### [NEW] `backend/main.py`
- The core FastAPI application.
- Includes CORS middleware to allow requests from the Next.js frontend (typically `http://localhost:3000`).
- Database initialization (`Base.metadata.create_all`).
- Two key API endpoints:
  - `POST /api/auth/register`: Create a new user (useful for testing the login).
  - `POST /api/auth/login`: Authenticate and return a JWT access token.

---

### Frontend (Next.js)

#### [MODIFY] `frontend/components/auth/login-form.tsx`
- Remove the simulated `setTimeout` API call.
- Make a `fetch` POST request to `http://localhost:8000/api/auth/login`.
- Handle successful authentication by storing the JWT token in `localStorage`.
- Display error messages if login fails (invalid credentials).

#### [NEW] `frontend/lib/api.ts` (Optional)
- A helper file for making authenticated requests to the FastAPI backend, automatically attaching the JWT token to the headers.

## Verification Plan

### Automated Tests
- Test the `/api/auth/register` and `/api/auth/login` endpoints directly using FastAPI's built-in Swagger UI at `http://localhost:8000/docs`.

### Manual Verification
- Start the FastAPI server (`uvicorn main:app --reload`).
- Register a test user.
- Go to the Next.js login page, enter the credentials.
- Verify that clicking "Login" authenticates the user, stores the token, and redirects to `/dashboard`.
