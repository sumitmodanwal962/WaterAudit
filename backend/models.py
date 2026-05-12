from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey, func, JSON
from sqlalchemy.orm import relationship
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime
from database import Base


# ── SQLAlchemy Models ─────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    # Profile fields
    user_type = Column(String, default="individual")  # "individual" or "organisation"
    full_name = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    org_name = Column(String, nullable=True)
    designation = Column(String, nullable=True)
    contact = Column(String, nullable=True)
    address = Column(String, nullable=True)
    location = Column(String, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String, nullable=False)
    location = Column(String, nullable=True)
    description = Column(String, nullable=True)
    scope = Column(String, nullable=True)           # dma / utility / zone / other
    project_type = Column(String, nullable=True)    # commercial / industrial / residential / municipal
    population = Column(Integer, nullable=True)
    capacity = Column(String, nullable=True)
    status = Column(String, default="active")       # active / completed / archived

    lead_auditor_name = Column(String, nullable=True)
    lead_auditor_email = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    owner = relationship("User", back_populates="projects")
    data_input = relationship("DataInput", back_populates="project", uselist=False, cascade="all, delete-orphan")


class DataInput(Base):
    __tablename__ = "data_inputs"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), unique=True, nullable=False)

    data_values = Column(JSON, default={})
    validation_scores = Column(JSON, default={})
    modal_answers = Column(JSON, default={})

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    project = relationship("Project", back_populates="data_input")


# ── Pydantic Schemas ──────────────────────────────────────────────

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    user_type: str = "individual"
    full_name: Optional[str] = None
    gender: Optional[str] = None
    org_name: Optional[str] = None
    designation: Optional[str] = None
    contact: Optional[str] = None
    address: Optional[str] = None
    location: Optional[str] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    gender: Optional[str] = None
    org_name: Optional[str] = None
    designation: Optional[str] = None
    contact: Optional[str] = None
    address: Optional[str] = None
    location: Optional[str] = None


class PasswordChange(BaseModel):
    current_password: str
    new_password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    user_type: str
    full_name: Optional[str] = None
    gender: Optional[str] = None
    org_name: Optional[str] = None
    designation: Optional[str] = None
    contact: Optional[str] = None
    address: Optional[str] = None
    location: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class ProjectCreate(BaseModel):
    title: str
    location: Optional[str] = None
    description: Optional[str] = None
    scope: Optional[str] = None
    project_type: Optional[str] = None
    population: Optional[int] = None
    capacity: Optional[str] = None
    lead_auditor_name: Optional[str] = None
    lead_auditor_email: Optional[str] = None


class ProjectResponse(BaseModel):
    id: int
    owner_id: int
    title: str
    location: Optional[str] = None
    description: Optional[str] = None
    scope: Optional[str] = None
    project_type: Optional[str] = None
    population: Optional[int] = None
    capacity: Optional[str] = None
    status: str
    lead_auditor_name: Optional[str] = None
    lead_auditor_email: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DataInputCreate(BaseModel):
    data_values: Dict[str, Any] = {}
    validation_scores: Dict[str, Any] = {}
    modal_answers: Dict[str, Any] = {}


class DataInputResponse(BaseModel):
    id: int
    project_id: int
    data_values: Dict[str, Any]
    validation_scores: Dict[str, Any]
    modal_answers: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
