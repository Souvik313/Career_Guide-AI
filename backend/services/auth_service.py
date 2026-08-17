import secrets
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.models.user import User
from backend.core.security import verify_password, hash_password


class AuthService:

    def __init__(self, db: Session):
        self.db = db

    def get_user_by_email(self, email: str):
        """
        Find a user by email address.
        """

        statement = select(User).where(
            User.email == email
        )

        return self.db.scalar(statement)

    def create_user(
        self,
        full_name: str,
        email: str,
        hashed_password: str,
    ):
        """
        Create and persist a new local user.
        """

        user = User(
            full_name=full_name,
            email=email,
            hashed_password=hashed_password,
            auth_provider="local",
            is_active=True,
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    def create_google_user(
        self,
        full_name: str,
        email: str,
    ):
        """
        Create and persist a new user who signed up via Google.
 
        There is no password for these accounts, so a random, unusable
        hash is stored to satisfy the non-null hashed_password column.
        It can never be used to log in via the password flow because
        the raw value is never known to the user and never returned.
        """
 
        placeholder_password = secrets.token_urlsafe(32)
 
        user = User(
            full_name=full_name,
            email=email,
            hashed_password=hash_password(placeholder_password),
            auth_provider="google",
            is_active=True,
        )
 
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
 
        return user

    def authenticate_user(
        self,
        email: str,
        password: str,
    ):
        """
        Authenticate a user using their email and password.

        Returns:
            User object if authentication succeeds.
            None if the email does not exist or the password is incorrect.
        """

        user = self.get_user_by_email(email)

        if not user:
            return None

        if not user.is_active:
            return None

        if not verify_password(
            password,
            user.hashed_password,
        ):
            return None

        return user