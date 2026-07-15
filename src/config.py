from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY=os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY not found. Please add it to your .env file."
    )

# Project Paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = PROJECT_ROOT / "data"
MODELS_DIR = PROJECT_ROOT / "models"
ASSETS_DIR = PROJECT_ROOT / "assets"

RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
RESUME_DATA_DIR = DATA_DIR / "resumes"
RESUME_PATH = RESUME_DATA_DIR / "Souvik_Roy_Resume.pdf"

RAW_DATA_PATH = RAW_DATA_DIR / "job_descriptions.csv"
PROCESSED_DATA_PATH = PROCESSED_DATA_DIR / "cleaned_job_descriptions.csv"
PROCESSED_DATA_PATH_WITH_SKILLS = PROCESSED_DATA_DIR / "processed_jobs_with_skills.csv"

EMBEDDINGS_PATH = MODELS_DIR / "job_embeddings.npy"
FAISS_INDEX_PATH = MODELS_DIR / "faiss_index.index"
SKILLS_PATH = ASSETS_DIR / "skills.csv"

import shutil
from src.utils.download_models import download_file

EMBEDDING_MODEL = "all-MiniLM-L6-v2"
TOP_K_RESULTS = 10

RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)
MODELS_DIR.mkdir(parents=True, exist_ok=True)

FILES = {
    RAW_DATA_PATH: "job_descriptions.csv",
    PROCESSED_DATA_PATH: "cleaned_job_descriptions.csv",
    PROCESSED_DATA_PATH_WITH_SKILLS: "processed_jobs_with_skills.csv",
    EMBEDDINGS_PATH: "job_embeddings.npy",
    FAISS_INDEX_PATH: "faiss_index.index",
}

for local_path, hf_filename in FILES.items():
    if not local_path.exists():
        print(f"Downloading {hf_filename}...")
        downloaded = download_file(hf_filename)
        shutil.copy(downloaded, local_path)
