import faiss
import numpy as np
import pandas as pd

from src.config import (
    EMBEDDING_MODEL,
    FAISS_INDEX_PATH,
    PROCESSED_DATA_PATH_WITH_SKILLS,
)

class EmbeddingSearch:

    def __init__(self):
        print("Loading FAISS index...")

        self.index = faiss.read_index(str(FAISS_INDEX_PATH))

        print("FAISS loaded.")

        print("Loading dataframe...")

        self.jobs = pd.read_csv(PROCESSED_DATA_PATH_WITH_SKILLS)

        print("Dataframe loaded.")
    
    def search_by_embedding(self , embedding , top_k = 10):
        """
        Search the FAISS index using a pre-computed embedding
        """

        embedding = embedding.reshape(1 , -1)
        distances, indices = self.index.search(
            embedding.astype("float32"),
            top_k
            )

        results = self.jobs.iloc[indices[0]].copy()

        results["Similarity Score"] = distances[0]

        return results
