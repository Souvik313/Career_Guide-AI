import os
from pathlib import Path

from datasets import load_dataset

# Hugging Face cache on D:
os.environ["HF_HOME"] = r"D:\AI_Cache\huggingface"
os.environ["HF_DATASETS_CACHE"] = r"D:\AI_Cache\datasets"

print("Loading dataset...")

dataset = load_dataset(
    "lang-uk/recruitment-dataset-job-descriptions-english"
)["train"]

print("Converting to pandas...")

df = dataset.to_pandas()

Path("data/raw").mkdir(parents=True, exist_ok=True)

csv_path = "data/raw/job_descriptions.csv"

df.to_csv(csv_path, index=False)

print(f"Dataset saved successfully to {csv_path}")
print(df.shape)