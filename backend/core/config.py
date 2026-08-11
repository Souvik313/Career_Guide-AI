from pathlib import Path
import os

from dotenv import load_dotenv


# Project root:
# CareerCompass-AI/
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Environment files
ROOT_ENV_PATH = PROJECT_ROOT / ".env"
BACKEND_ENV_PATH = PROJECT_ROOT / "backend" / ".env"


# Load both environment files
if os.getenv("DATABASE_URL") is None:
    load_dotenv(ROOT_ENV_PATH)
    load_dotenv(BACKEND_ENV_PATH)

class Settings:

    DATABASE_URL = os.getenv("DATABASE_URL")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    GROQ_MODEL = os.getenv(
        "GROQ_MODEL",
        "llama-3.3-70b-versatile",
    )
    ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

    if DATABASE_URL is None:
        raise ValueError(
            "DATABASE_URL not found in backend/.env"
        )

    if GROQ_API_KEY is None:
        raise ValueError(
            "GROQ_API_KEY not found in root .env"
        )
    if ACCESS_TOKEN_EXPIRE_MINUTES is None:
        raise ValueError(
            "ACCESS_TOKEN not found in root .env"
        )
    if SECRET_KEY is None:
        raise ValueError(
            "SECRET_KEY not found in root .env"
        )
    


settings = Settings()