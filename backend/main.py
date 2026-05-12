from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List

import models
import auth
from database import engine, get_db

# Create all tables (will not modify existing tables, only creates missing ones)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="WaterAudit API")

# Setup CORS to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


# ── Helper: get current user from token ───────────────────────────
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except auth.JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user


# ── Register ──────────────────────────────────────────────────────
@app.post("/api/auth/register", response_model=models.UserResponse)
def register_user(user: models.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        user_type=user.user_type,
        full_name=user.full_name,
        gender=user.gender,
        org_name=user.org_name,
        designation=user.designation,
        contact=user.contact,
        address=user.address,
        location=user.location,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# ── Login ─────────────────────────────────────────────────────────
@app.post("/api/auth/login", response_model=models.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Username or Password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# ── Get Current User ──────────────────────────────────────────────
@app.get("/api/users/me", response_model=models.UserResponse)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user


# ── Update Profile ────────────────────────────────────────────────
@app.put("/api/users/me", response_model=models.UserResponse)
def update_profile(
    update: models.UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    for field, value in update.model_dump(exclude_none=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user


# ── Change Password ───────────────────────────────────────────────
@app.post("/api/users/me/change-password")
def change_password(
    data: models.PasswordChange,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not auth.verify_password(data.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    current_user.hashed_password = auth.get_password_hash(data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}


# ── Projects: List ────────────────────────────────────────────────
@app.get("/api/projects", response_model=List[models.ProjectResponse])
def list_projects(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    projects = (
        db.query(models.Project)
        .filter(models.Project.owner_id == current_user.id)
        .order_by(models.Project.updated_at.desc())
        .all()
    )
    return projects


# ── Projects: Create ──────────────────────────────────────────────
@app.post("/api/projects", response_model=models.ProjectResponse, status_code=201)
def create_project(
    project: models.ProjectCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    new_project = models.Project(
        owner_id=current_user.id,
        **project.model_dump(),
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project


# ── Projects: Get Single ──────────────────────────────────────────
@app.get("/api/projects/{project_id}", response_model=models.ProjectResponse)
def get_project(
    project_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == current_user.id,
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


# ── Projects: Delete ──────────────────────────────────────────────
@app.delete("/api/projects/{project_id}", status_code=204)
def delete_project(
    project_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == current_user.id,
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.commit()
    return None


# ── Data Input: Get Progress ──────────────────────────────────────
@app.get("/api/projects/{project_id}/data-input", response_model=models.DataInputResponse)
def get_data_input(
    project_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == current_user.id
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    data_input = db.query(models.DataInput).filter(models.DataInput.project_id == project_id).first()
    if not data_input:
        # Return an empty structure if none exists
        return models.DataInputResponse(
            id=0, 
            project_id=project_id, 
            data_values={}, 
            validation_scores={}, 
            modal_answers={},
            created_at=project.created_at,
            updated_at=project.updated_at
        )
    return data_input


# ── Data Input: Save Progress ─────────────────────────────────────
@app.post("/api/projects/{project_id}/data-input", response_model=models.DataInputResponse)
def save_data_input(
    project_id: int,
    data: models.DataInputCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == current_user.id
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db_data = db.query(models.DataInput).filter(models.DataInput.project_id == project_id).first()
    if db_data:
        db_data.data_values = data.data_values
        db_data.validation_scores = data.validation_scores
        db_data.modal_answers = data.modal_answers
    else:
        db_data = models.DataInput(
            project_id=project_id,
            data_values=data.data_values,
            validation_scores=data.validation_scores,
            modal_answers=data.modal_answers
        )
        db.add(db_data)
    
    db.commit()
    db.refresh(db_data)
    return db_data
