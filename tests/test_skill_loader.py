from pathlib import Path

from src.job_processing.skill_extractor import SkillExtractor

import pandas as pd


def main():

    extractor = SkillExtractor(
        dataframe=pd.DataFrame(),
        skills_path=Path("assets/skills.csv")
    )

    print()

    print(f"Loaded {len(extractor.skills)} skills")

    print()

    print(extractor.skills[:20])


if __name__ == "__main__":
    main()