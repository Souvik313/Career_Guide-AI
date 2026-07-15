from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException

# COMMENT THIS OUT
# from backend.services.career_pipeline import CareerPipeline

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

@router.post("/upload-resume")
async def upload_resume():
    return {"message": "Route works"}
