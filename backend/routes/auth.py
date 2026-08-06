from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from backend.database.session import get_db
from backend.services.auth_service import AuthService
from backend.core.security import (
    hash_password,
    create_access_token,
)
from backend.core.authorization import get_current_user
from backend.models.user import User
from backend.schemas.user import UserLogin


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


class SignupRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
    }

@router.post(
    "/signup",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup(
    user_data: SignupRequest,
    db: Annotated[Session, Depends(get_db)],
):
    auth_service = AuthService(db)

    # Check whether the email is already registered
    existing_user = auth_service.get_user_by_email(
        user_data.email
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    # Hash the password before storing it
    hashed_password = hash_password(
        user_data.password
    )

    # Create the user through the service layer
    user = auth_service.create_user(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hashed_password,
    )

    # Generate JWT for the newly registered user
    access_token = create_access_token(
        user_id=user.id
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post(
    "/login",
    response_model=AuthResponse,
)
def login(
    credentials: UserLogin,
    db: Annotated[Session, Depends(get_db)],
):
    auth_service = AuthService(db)

    user = auth_service.authenticate_user(
        email=credentials.email,
        password=credentials.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    access_token = create_access_token(
        user_id=user.id
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }