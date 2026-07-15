from pathlib import Path
import shutil

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException

from backend.services.career_pipeline import CareerPipeline

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    try:
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only pdf resumes are supported"
            )
        
        file_path = UPLOAD_FOLDER / file.filename

        with open(file_path , "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        pipeline = CareerPipeline()
        result = pipeline.run_pipeline(
            str(file_path)
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
