from huggingface_hub import hf_hub_download

REPO_ID = "Souvik20202S/careercompass-ai-model-files"

def download_file(filename):
    """
    Download a single file from the Hugging Face dataset.
    Returns the local cached path.
    """
    return hf_hub_download(
        repo_id=REPO_ID,
        filename=filename,
        repo_type="dataset",
    )

def get_model_paths():

    embedding_path = hf_hub_download(
        repo_id=REPO_ID,
        filename="job_embeddings.npy",
        repo_type="dataset",
    )

    faiss_path = hf_hub_download(
        repo_id=REPO_ID,
        filename="faiss_index.index",
        repo_type="dataset",
    )

    return embedding_path, faiss_path