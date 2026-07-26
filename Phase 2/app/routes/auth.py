from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import (
    UserRegister,
    UserLogin,
    UserResponse,
    RegisterResponse,
    Token,
    RefreshTokenRequest,
    PasswordResetRequest,
    PasswordResetConfirm
)
from app.auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    verify_refresh_token,
    create_verification_token,
    verify_email_token,
    create_reset_token,
    verify_reset_token
)
from app.token_blacklist import blacklist_token
from app.dependencies import security
from app.limiter import limiter
from app.logger import logger

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================================
# Register
# ==========================================

@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        logger.warning(f"Registration failed: Email already registered ({user.email})")
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password),
        phone_number=user.phone_number,
        neighborhood_zone=user.neighborhood_zone,
        is_verified=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    v_token = create_verification_token(new_user.email)
    logger.info(f"New user registered: {new_user.email} (user_id={new_user.user_id})")

    return {
        "user": new_user,
        "verification_token": v_token,
        "message": "User registered successfully. Use the provided verification token to verify your email at /auth/verify-email."
    }


# ==========================================
# Email Verification
# ==========================================

@router.get("/verify-email")
def verify_email(
    token: str,
    db: Session = Depends(get_db)
):
    email = verify_email_token(token)
    if not email:
        logger.warning("Invalid or expired email verification token provided.")
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired verification token."
        )

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User associated with this token was not found."
        )

    if user.is_verified:
        return {"message": "Email is already verified."}

    user.is_verified = True
    db.commit()
    logger.info(f"Email verified for user: {user.email}")

    return {"message": "Email successfully verified. You may now login."}


# ==========================================
# Login
# ==========================================

@router.post(
    "/login",
    response_model=Token
)
@limiter.limit("5/minute")
def login(
    request: Request,
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user is None or not verify_password(user.password, existing_user.password_hash):
        logger.warning(f"Failed login attempt for email: {user.email}")
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not existing_user.is_verified:
        logger.warning(f"Unverified user login attempt: {user.email}")
        raise HTTPException(
            status_code=403,
            detail="Email address is not verified. Please verify your email before logging in."
        )

    access_token = create_access_token({"user_id": existing_user.user_id})
    refresh_token = create_refresh_token({"user_id": existing_user.user_id})

    logger.info(f"User logged in successfully: {user.email}")

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


# ==========================================
# Token Refresh
# ==========================================

@router.post(
    "/refresh",
    response_model=dict
)
def refresh_token_endpoint(
    data: RefreshTokenRequest,
    db: Session = Depends(get_db)
):
    user_id = verify_refresh_token(data.refresh_token)
    if user_id is None:
        logger.warning("Invalid or expired refresh token submitted.")
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired refresh token."
        )

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    new_access_token = create_access_token({"user_id": user.user_id})
    logger.info(f"Access token refreshed for user_id: {user_id}")

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }


# ==========================================
# Logout
# ==========================================

@router.post("/logout")
def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    blacklist_token(token)
    logger.info("User logged out and token blacklisted.")
    return {"message": "Successfully logged out. Token has been revoked."}


# ==========================================
# Forgot Password
# ==========================================

@router.post("/forgot-password")
@limiter.limit("3/minute")
def forgot_password(
    request: Request,
    body: PasswordResetRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == body.email).first()
    if not user:
        # Avoid user enumeration in production, but provide feedback for testing
        logger.info(f"Password reset requested for non-existent email: {body.email}")
        return {"message": "If that email exists in our system, a password reset token has been generated."}

    reset_token = create_reset_token(user.email)
    logger.info(f"Password reset token created for: {user.email}")

    return {
        "message": "Password reset token generated successfully.",
        "reset_token": reset_token
    }


# ==========================================
# Reset Password
# ==========================================

@router.post("/reset-password")
def reset_password(
    body: PasswordResetConfirm,
    db: Session = Depends(get_db)
):
    email = verify_reset_token(body.token)
    if not email:
        logger.warning("Invalid or expired password reset token provided.")
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset token."
        )

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    user.password_hash = hash_password(body.new_password)
    db.commit()

    logger.info(f"Password successfully reset for user: {email}")
    return {"message": "Password has been reset successfully. You may now login with your new password."}