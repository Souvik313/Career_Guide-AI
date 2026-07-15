from src.models.model_loader import get_embedding_model

class ResumeEmbedding:

    def __init__(self):
        """
        Load the embedding model once
        """

        self.model = get_embedding_model()

    def generate_embedding(self, resume_text):
        """
        Generate an embedding vector for the cleaned resume text
        """
        
        embedding = self.model.encode(
            resume_text,
            convert_to_numpy=True
        )

        return embedding
    
