from pathlib import Path
import pandas as pd

from src.config import PROCESSED_DATA_DIR
from src.embeddings.embedding_generator import EmbeddingGenerator

def main():

    input_path = PROCESSED_DATA_DIR / "processed_jobs_with_skills.csv"
    df = pd.read_csv(input_path)

    generator = EmbeddingGenerator(df)
    processed_df = generator.process_dataset()

    output_path = PROCESSED_DATA_DIR / "processed_jobs_with_combined_text.csv"
    generator.save_dataset(output_path)

    print()

    print("Combined text example:\n")
    print(processed_df["combined_text"].iloc[0])
    
    print()
    
    print("Dataset shape:")
    print(processed_df.shape)

if __name__ == "__main__":
    main()