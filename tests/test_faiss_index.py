import numpy as np
from pathlib import Path

from src.config import EMBEDDINGS_PATH, FAISS_INDEX_PATH
from src.embeddings.faiss_index_builder import FAISSIndexBuilder

def main():

    # Load embeddings
    embeddings = np.load(EMBEDDINGS_PATH)
    print(f"Loaded embeddings: {embeddings.shape}")

    # Build FAISS index
    builder = FAISSIndexBuilder(embeddings)
    builder.normalize_embeddings()
    index = builder.build_index()

    # Display index info
    print("\nFAISS Index Information")
    print(f"Embedding dimension : {builder.dimension}")
    print(f"Total vectors : {index.ntotal}")

    # Save index
    Path(FAISS_INDEX_PATH).parent.mkdir(parents=True , exist_ok=True)
    builder.save_index(FAISS_INDEX_PATH)
    print("\nFAISS index built and saved successfully!")

if __name__ == "__main__":
    main()