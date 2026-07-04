from pathlib import Path

# Project Paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = PROJECT_ROOT / "data"

RAW_DATA_DIR = DATA_DIR / "raw"

PROCESSED_DATA_DIR = DATA_DIR / "processed"

RAW_DATA_PATH = RAW_DATA_DIR / "job_descriptions.csv"

PROCESSED_DATA_PATH = PROCESSED_DATA_DIR / "cleaned_job_descriptions.csv"



