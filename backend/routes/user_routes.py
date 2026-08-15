from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.database.session import get_db
from backend.core.authorization import get_current_user
from backend.models.user import User
from backend.schemas.user import (
    UserProfileResponse,
    UserProfileUpdate,
    PasswordChange,
)
from backend.services.user_service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

# GET current user profile
router.get("/me" , response_model=UserProfileResponse)
def get_my_profile(
        current_user: User = Depends(get_current_user),
):
    return current_user

# UPDATE current user profile
router.patch(
    "/me",
    response_model=UserProfileResponse
)
def update_my_profile(
    request: UserProfileUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)] = None,
):
    user_service = UserService(db)

    updated_user = user_service.update_profile(
        user=current_user,
        full_name=request.full_name,
        phone_number=request.phone_number,
        address=request.address,
    )

    return updated_user

# CHANGE password
router.patch(
    "/me/password",
)
def change_my_password(
    request: PasswordChange,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    user_service = UserService(db)

    try:
        user_service.change_password(
            user=current_user,
            current_password=request.current_password,
            new_password=request.new_password,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    return {
        "message": "Password changed successfully!"
    }

