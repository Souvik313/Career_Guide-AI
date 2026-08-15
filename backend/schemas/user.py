from pydantic import BaseModel, EmailStr, ConfigDict, Field

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfileResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    full_name: str
    email: EmailStr
    phone_number: str | None
    address: str | None
    auth_provider: str
    is_active: bool

class UserProfileUpdate(BaseModel):

    full_name: str | None=None
    phone_number: str | None=None
    address: str | None=None

class PasswordChange(BaseModel):

    current_password: str
    new_password: str = Field(
        min_length=8,
        max_length=128,
    )