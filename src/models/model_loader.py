from sentence_transformers import SentenceTransformer
from src.config import EMBEDDING_MODEL

_embedding_model = None

def get_embedding_model():
    global _embedding_model

    if _embedding_model is None:
        print("Loading embedding model...")
        _embedding_model = SentenceTransformer(EMBEDDING_MODEL)

    return _embedding_model