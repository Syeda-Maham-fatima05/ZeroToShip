import re
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime


# ==========================================
# User Registration
# ==========================================

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone_number: str
    neighborhood_zone: str

    @field_validator("password")
    @classmethod
    def validate_strong_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password must contain at least one special character.")
        return v


# ==========================================
# User Login
# ==========================================

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ==========================================
# User Response
# ==========================================

class UserResponse(BaseModel):
    user_id: int
    name: str
    email: EmailStr
    phone_number: Optional[str] = None
    neighborhood_zone: Optional[str] = None
    is_verified: bool = False

    class Config:
        from_attributes = True


class RegisterResponse(BaseModel):
    user: UserResponse
    verification_token: str
    message: str


# ==========================================
# JWT Token Response
# ==========================================

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class TokenData(BaseModel):
    user_id: Optional[int] = None


# ==========================================
# Password Reset Schemas
# ==========================================

class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

    @field_validator("new_password")
    @classmethod
    def validate_strong_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password must contain at least one special character.")
        return v


# ==========================================
# Booking Response
# ==========================================

class BookingResponse(BaseModel):
    booking_id: int
    user_id: int
    provider_id: int
    booking_time: datetime
    status: str
    customer_address: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True


# ==========================================
# Provider Response
# ==========================================

class ProviderResponse(BaseModel):
    provider_id: int
    name: str
    service_type: str
    location: Optional[str] = None
    phone_number: Optional[str] = None
    rating: Optional[float] = None
    availability: Optional[str] = None

    class Config:
        from_attributes = True