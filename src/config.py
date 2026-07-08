from pathlib import Path

# Project Paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = PROJECT_ROOT / "data"
MODELS_DIR = PROJECT_ROOT / "models"

RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
RESUME_DATA_DIR = DATA_DIR / "resumes"

RAW_DATA_PATH = RAW_DATA_DIR / "job_descriptions.csv"
PROCESSED_DATA_PATH = PROCESSED_DATA_DIR / "cleaned_job_descriptions.csv"

EMBEDDINGS_PATH = MODELS_DIR / "job_embeddings.npy"
FAISS_INDEX_PATH = MODELS_DIR / "faiss_index.index"

EMBEDDING_MODEL = "all-MiniLM-L6-v2"
TOP_K_RESULTS = 10
