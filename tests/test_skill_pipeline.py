from pathlib import Path

import pandas as pd

from src.config import (
    PROCESSED_DATA_PATH,
    PROCESSED_DATA_DIR
)

from src.job_processing.skill_extractor import SkillExtractor


def main():

    df = pd.read_csv(PROCESSED_DATA_PATH)

    extractor = SkillExtractor(
        dataframe=df,
        skills_path=Path("assets/skills.csv")
    )

    processed_df = extractor.process_dataset()

    output_path = PROCESSED_DATA_DIR / "processed_jobs_with_skills.csv"

    extractor.save_modified_dataset(output_path)

    print()

    print(processed_df[["Position", "Skills"]].head())


if __name__ == "__main__":
    main()