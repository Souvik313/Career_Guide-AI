from sqlalchemy.orm import Session

from backend.models.user import User
from backend.core.security import(
    hash_password,
    verify_password,
)

class UserService: 

    def __init__(self , db: Session):
        self.db = db

    # Update Profile
    def update_profile(
        self,
        user: User,
        full_name: str | None = None,
        phone_number: str | None = None,
        address: str | None = None,
    ):

        if full_name is not None:
            user.full_name = full_name

        if phone_number is not None:
            user.phone_number = phone_number

        if address is not None:
            user.address = address

        self.db.commit()
        self.db.refresh(user)

        return user

    # Change Password
    def change_password(
        self,
        user: User,
        current_password: str | None = None,
        new_password: str | None = None
    ):
        if user.auth_provider != "local":
            raise ValueError(
                "Passwprd cannot be changed for this account."
            )

        if not verify_password(
            current_password,
            user.hashed_password,
        ):
            raise ValueError(
                "Current password is incorrect."
            )

        if verify_password(
            new_password,
            user.hashed_password,
        ):
            raise ValueError(
                "New password must be different from your current password."
            )

        user.hashed_password = hash_password(
            new_password
        )