from pathlib import Path
from huggingface_hub import hf_hub_download

REPO_ID = "Souvik20202S/careercompass-ai-model-files"
REPO_TYPE = "dataset"

MODEL_DIR = Path("models")
MODEL_DIR.mkdir(parents=True, exist_ok=True)


def download_models():

    files = [
        "job_embeddings.npy",
        "faiss_index.index",
    ]

    for file in files:

        destination = MODEL_DIR / file

        if destination.exists():
            print(f"✅ {file} already exists.")
            continue

        print(f"⬇ Downloading {file}...")

        downloaded_path = hf_hub_download(
            repo_id=REPO_ID,
            filename=file,
            repo_type=REPO_TYPE,
        )

        destination.write_bytes(Path(downloaded_path).read_bytes())

        print(f"✅ {file} downloaded successfully.")