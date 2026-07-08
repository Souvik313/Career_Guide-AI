from sentence_transformers import SentenceTransformer
from src.config import EMBEDDING_MODEL

class ResumeEmbedding:

    def __init__(self):
        """
        Load the embedding model once
        """

        self.model = SentenceTransformer(EMBEDDING_MODEL)

    def generate_embedding(self, resume_text):
        """
        Generate an embedding vector for the cleaned resume text
        """
        
        embedding = self.model.encode(
            resume_text,
            convert_to_numpy=True
        )

        return embedding
    
