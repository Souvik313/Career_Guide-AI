from pathlib import Path
from typing import (List , Set)
from evaluation.batch_loader import load_all_resumes

import logging
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent

GROUND_TRUTH_PATH = (
    PROJECT_ROOT /
    "data" /
    "ground_truth.csv"
)

VALID_DOMAINS = [
    "Backend",
    "Frontend",
    "FullStack",
    "DevOps",
    "DataAnalytics",
    "ML_AI",
]

VALID_DIFFICULTIES = [
    "Easy",
    "Medium",
    "Hard",
]

def load_ground_truth() -> pd.DataFrame:
    """
    Load the ground truth benchmark CSV.

    Returns
    -------
    pd.DataFrame
        Ground truth benchmark dataframe.

    Raises
    ------
    FileNotFoundError
        If ground_truth.csv is not found.
    """

    if not GROUND_TRUTH_PATH.exists():
        logging.error(
            "Ground truth file not found: %s",
            GROUND_TRUTH_PATH,
        )
        raise FileNotFoundError(GROUND_TRUTH_PATH)

    df = pd.read_csv(GROUND_TRUTH_PATH)

    logging.info(
        "Loaded ground truth with %d resumes.",
        len(df),
    )

    return df

def validate_columns(df: pd.DataFrame) -> None:
    """
    Validate that the ground truth dataset contains all required columns.

    Args:
        df (pd.DataFrame):
            Ground truth dataframe.

    Raises:
        ValueError:
            If one or more required columns are missing.
    """

    required_columns: Set[str] = {
        "Resume_ID",
        "Primary_Domain",
        "Difficulty",
        "Expected_Role_1",
        "Expected_Role_2",
        "Expected_Role_3",
        "Expected_Role_4",
        "Expected_Role_5",
    }

    dataframe_columns = set(df.columns)

    missing_columns = required_columns - dataframe_columns

    if missing_columns:

        logging.error(
            "Ground truth is missing required columns: %s",
            sorted(missing_columns),
        )

        raise ValueError(
            f"Missing required columns: {sorted(missing_columns)}"
        )

    logging.info(
        "Ground truth schema validation passed."
    )

def validate_duplicate_resume_ids(df: pd.DataFrame) -> None:
    """
    Validate that each Resume_ID in the ground truth dataset is unique.

    Args:
        df (pd.DataFrame):
            Ground truth dataframe.

    Raises:
        ValueError:
            If duplicate Resume_ID values are found.
    """

    duplicate_ids = (
        df[df["Resume_ID"].duplicated(keep=False)]["Resume_ID"]
        .sort_values()
        .unique()
        .tolist()
    )

    if duplicate_ids:

        logging.error(
            "Duplicate Resume_ID values detected: %s",
            duplicate_ids,
        )

        raise ValueError(
            f"Duplicate Resume_ID values found: {duplicate_ids}"
        )

    logging.info(
        "Resume_ID uniqueness validation passed."
    )

def validate_domains(df: pd.DataFrame) -> None:
    """
    Validate that every Primary_Domain belongs to the supported domains.

    Args:
        df (pd.DataFrame):
            Ground truth dataframe.

    Raises:
        ValueError:
            If one or more invalid domain labels are found.
    """

    invalid_domains = sorted(
        set(df["Primary_Domain"]) - set(VALID_DOMAINS)
    )

    if invalid_domains:

        logging.error(
            "Invalid domain labels detected: %s",
            invalid_domains,
        )

        raise ValueError(
            f"Invalid domain labels: {invalid_domains}"
        )

    logging.info(
        "Primary_Domain validation passed."
    )

def validate_difficulty(df: pd.DataFrame) -> None:
    """
    Validate that every difficulty label belongs to the supported set.

    Args:
        df (pd.DataFrame):
            Ground truth dataframe.

    Raises:
        ValueError:
            If one or more invalid difficulty labels are found.
    """

    invalid_difficulties = sorted(
        set(df["Difficulty"]) - set(VALID_DIFFICULTIES)
    )

    if invalid_difficulties:

        logging.error(
            "Invalid difficulty labels detected: %s",
            invalid_difficulties,
        )

        raise ValueError(
            f"Invalid difficulty labels: {invalid_difficulties}"
        )

    logging.info(
        "Difficulty label validation passed."
    )

def validate_missing_values(df: pd.DataFrame) -> None:
    """
    Validate that all required columns contain non-empty values.

    Missing values include:
    - NaN
    - Empty strings
    - Strings containing only whitespace

    Args:
        df (pd.DataFrame):
            Ground truth dataframe.

    Raises:
        ValueError:
            If missing values are found.
    """

    required_columns = [
        "Resume_ID",
        "Primary_Domain",
        "Difficulty",
        "Expected_Role_1",
        "Expected_Role_2",
        "Expected_Role_3",
        "Expected_Role_4",
        "Expected_Role_5",
    ]

    missing_columns = {}

    for column in required_columns:

        missing_mask = (
            df[column].isna()
            |
            df[column].astype(str).str.strip().eq("")
        )

        missing_count = missing_mask.sum()

        if missing_count > 0:

            missing_columns[column] = int(missing_count)

    if missing_columns:

        logging.error(
            "Missing values detected: %s",
            missing_columns,
        )

        raise ValueError(
            f"Missing values found: {missing_columns}"
        )

    logging.info(
        "Missing value validation passed."
    )

def validate_resume_files(
    df: pd.DataFrame,
    resumes: List[dict],
) -> None:
    """
    Validate that the evaluation resumes and the ground truth
    benchmark contain exactly the same Resume_ID values.

    Args:
        df (pd.DataFrame):
            Ground truth dataframe.

        resumes (List[dict]):
            Loaded resumes from batch_loader.py.

    Raises:
        ValueError:
            If resumes and benchmark are inconsistent.
    """

    csv_resume_ids = set(df["Resume_ID"])

    pdf_resume_ids = {
        resume["resume_id"]
        for resume in resumes
    }

    missing_pdf_files = sorted(
        csv_resume_ids - pdf_resume_ids
    )

    extra_pdf_files = sorted(
        pdf_resume_ids - csv_resume_ids
    )

    if missing_pdf_files:

        logging.error(
            "Ground truth entries without PDF resumes: %s",
            missing_pdf_files,
        )

    if extra_pdf_files:

        logging.error(
            "PDF resumes without ground truth entries: %s",
            extra_pdf_files,
        )

    if missing_pdf_files or extra_pdf_files:

        raise ValueError(
            "Ground truth and resume files are inconsistent."
        )

    logging.info(
        "Resume file validation passed."
    )

def validate_ground_truth(
    df: pd.DataFrame,
    resumes: List[dict],
) -> None:
    """
    Execute all ground truth validation checks.

    Args:
        df (pd.DataFrame):
            Ground truth dataframe.

        resumes (List[dict]):
            Loaded evaluation resumes.

    Raises:
        ValueError:
            If any validation check fails.
    """

    logging.info(
        "Starting ground truth validation..."
    )

    validate_columns(df)

    validate_duplicate_resume_ids(df)

    validate_domains(df)

    validate_difficulty(df)

    validate_missing_values(df)

    validate_resume_files(
        df,
        resumes,
    )

    logging.info(
        "All ground truth validation checks passed successfully."
    )

def main() -> None:
    """
    Entry point for validating the ground truth benchmark.

    Workflow
    --------
    1. Load evaluation resumes.
    2. Load ground truth CSV.
    3. Validate the benchmark.
    4. Print summary statistics.
    """

    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s | %(message)s",
    )

    logging.info("-" * 60)
    logging.info("Ground Truth Benchmark Validation")
    logging.info("-" * 60)

    resumes = load_all_resumes()

    df = load_ground_truth()

    validate_ground_truth(
        df=df,
        resumes=resumes,
    )

    logging.info("-" * 60)
    logging.info("Ground Truth Summary")
    logging.info("-" * 60)

    logging.info(
        "Total benchmark resumes: %d",
        len(df),
    )

    logging.info(
        "Supported domains: %d",
        df["Primary_Domain"].nunique(),
    )

    logging.info(
        "Difficulty levels: %s",
        ", ".join(sorted(df["Difficulty"].unique())),
    )

    logging.info(
        "Ground truth benchmark verification completed successfully."
    )

if __name__ == "__main__":
    main()