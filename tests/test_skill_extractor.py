from pathlib import Path

import pandas as pd

from src.job_processing.skill_extractor import SkillExtractor


def main():

    extractor = SkillExtractor(
        dataframe=pd.DataFrame(),
        skills_path=Path("assets/skills.csv")
    )

    sample = """
    We are looking for a Machine Learning Engineer
    with Python, PyTorch, Docker,
    Kubernetes and AWS experience.
    """

    skills = extractor.extract_skills(sample)

    print()

    print("Extracted Skills:")

    print(skills)


if __name__ == "__main__":
    main()