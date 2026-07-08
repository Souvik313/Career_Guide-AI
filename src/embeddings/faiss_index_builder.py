import numpy as np
import faiss

class FAISSIndexBuilder:

    def __init__(self , embeddings):
        
        self.embeddings = embeddings.astype(np.float32)
        self.dimension = self.embeddings.shape[1]
        self.index = None

    def normalize_embeddings(self):
        """
        Normalize embeddings for cosine similarity
        """

        faiss.normalize_L2(self.embeddings)

    def build_index(self):
        """
        Build a FAISS IndexFlatIP
        """
        self.index = faiss.IndexFlatIP(self.dimension)

        self.index.add(self.embeddings)

        return self.index
    
    def save_index(self , output_path):
        """
        Save the FAISS index to disk
        """

        faiss.write_index(self.index , str(output_path))
        print(f"FAISS index saved to {output_path}")

    