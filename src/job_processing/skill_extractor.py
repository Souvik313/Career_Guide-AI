from pathlib import Path
import pandas as pd
import re

class SkillExtractor:
    """
    Extracts technical skills from job descriptions.
    """

    def __init__(self , dataframe: pd.DataFrame , skills_path: Path):
        self.df = dataframe.copy()
        self.skills_path = skills_path
        self.skills = self.load_skills()

    def load_skills(self):

        skills = pd.read_csv(self.skills_path)

        return (
            skills["skill"]
                .dropna()
                .str.strip()
                .tolist()
        )
    
    def extract_skills(self , text: str):
        """
        Extract technical skills from a job description.
        """

        if not isinstance(text, str):
            return []
        
        text = text.lower()
        extracted_skills = []
        
        for skill in self.skills:
            pattern = r"\b" + re.escape(skill.lower()) + r"\b"

            if re.search(pattern, text):
                extracted_skills.append(skill)

        return sorted(list(set(extracted_skills)))
    
    def process_dataset(self):
        """
        Extract skills from all jib descriptions and add them in a new skills column in the copy of original dataframe.
        """

        self.df["Skills"] = self.df["Long Description"].apply(
            self.extract_skills
        )

        return self.df
    
    def save_modified_dataset(self , output_path):
        """
        Save the modified dataset.
        """

        self.df.to_csv(output_path , index=False)
        print(f"Dataset saved to {output_path}")

    