import time

import pandas as pd

from src.config import PROCESSED_DATA_DIR, MODELS_DIR
from src.embeddings.embedding_generator import EmbeddingGenerator


def main():

    input_path = PROCESSED_DATA_DIR / "processed_jobs_with_combined_text.csv"

    df = pd.read_csv(input_path)

    generator = EmbeddingGenerator(df)

    print("Generating embeddings...\n")

    start_time = time.time()

    embeddings = generator.generate_embeddings()

    end_time = time.time()

    print("\nEmbedding generation completed!")

    print(f"\nEmbedding Shape: {embeddings.shape}")

    print(f"\nEmbedding Dimension: {embeddings.shape[1]}")

    print(f"\nTotal Jobs: {embeddings.shape[0]}")

    print(f"\nTime Taken: {end_time-start_time:.2f} seconds")

    output_path = MODELS_DIR / "job_embeddings.npy"

    generator.save_embeddings(
        embeddings,
        output_path
    )


if __name__ == "__main__":
    main()