import ast
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer

class EmbeddingGenerator:

    def __init__(self , dataframe):
        self.df = dataframe.copy()
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.embedding_dimension = 384

    # Create combined text
    def create_combined_text(self , row):
        skills = row["Skills"]

        # Convert string representation of list into python list
        if isinstance(skills, str):

            try:
                skills = ast.literal_eval(skills)

            except Exception:
                skills = []

        if not isinstance(skills, list):
            skills = []

        skills = ", ".join(skills)

        combined_text = f"""
            Position: {row["Position"]}

            Company: {row["Company Name"]}

            Experience: {row["Exp Years"]}

            Primary Keyword: {row["Primary Keyword"]}

            English Level: {row["English Level"]}

            Skills: {skills}

            Description:
            {row["Long Description"]}
            """

        return combined_text.strip()
    
    # Generate the combined_text column in the dataset
    def process_dataset(self):
        self.df["combined_text"] = self.df.apply(
            self.create_combined_text,
            axis = 1,
        )

        return self.df
    
    # Generate embeddings
    def generate_embeddings(self):

        embeddings = self.model.encode(
            self.df["combined_text"].tolist(),
            batch_size=32,
            show_progress_bar=True,
            convert_to_numpy=True,
        )

        return embeddings
    
    # Save dataset
    def save_dataset(self , output_path):
        self.df.to_csv(output_path , index=False)
        print(f"Dataset saved to {output_path}")

    # Save embeddings
    def save_embeddings(self , embeddings, output_path):
        np.save(output_path , embeddings)
        print(f"Embeddings saved to {output_path}")