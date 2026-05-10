from sqlalchemy import Boolean, Column, Integer, String
from pydantic import BaseModel, EmailStr
from typing import Optional
from database import Base

# SQLAlchemy Models (Database Tables)
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


# Pydantic Models (Data Validation)
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

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    user_type: str
    full_name: Optional[str] = None
    org_name: Optional[str] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None
