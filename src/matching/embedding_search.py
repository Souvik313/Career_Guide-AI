import faiss
import numpy as np
import pandas as pd

from sentence_transformers import SentenceTransformer
from src.config import (
    EMBEDDING_MODEL,
    FAISS_INDEX_PATH,
    PROCESSED_DATA_PATH_WITH_SKILLS,
)

class EmbeddingSearch:

    def __init__(self):
        self.model = SentenceTransformer(EMBEDDING_MODEL)
        self.index = faiss.read_index(str(FAISS_INDEX_PATH))
        self.jobs = pd.read_csv(PROCESSED_DATA_PATH_WITH_SKILLS)

    def embed_query(self , query):
        """
        Takes a query and converts it into a normalized embedding
        """

        embedding = self.model.encode(
            [query],
            convert_to_numpy = True
        )

        embedding = embedding.astype(np.float32)
        faiss.normalize_L2(embedding)

        return embedding
    
    def _retrieve_results(self , scores , indices):
        """
        Convert FAISS search ourput into a dataframe
        """

        results = self.jobs.iloc[indices[0]].copy()
        results["Similarity Score"] = scores[0]
        results = results.sort_values(
            by="Similarity Score",
            ascending=False
        ).reset_index(drop=True)

        return results
    
    def search(self , query , top_k = 10):
        """
        Search for the most similar jobs
        """

        query_embedding = self.embed_query(query)
        scores, indices = self.index.search(
            query_embedding,
            top_k
        )
        return self._retrieve_results(
            scores , indices
        )
    
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
    
    
