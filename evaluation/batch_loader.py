import logging
from pathlib import Path
from typing import (
        Optional,
        List,
        Dict,
        Any,
        )
import fitz

PROJECT_ROOT = Path(__file__).resolve().parent.parent

EVALUATION_RESUME_DIR = (
    PROJECT_ROOT /
    "data" /
    "resumes" /
    "evaluation"
)

def configure_logging() -> None:
    """
    Configure logging for the batch resume loader.
    """
    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s | %(message)s"
    )

def extract_text_from_pdf(pdf_path: Path) -> str:
    """
    Extract text from a PDF resume using PyMuPDF.

    Args:
        pdf_path (Path):
            Path to the PDF resume.

    Returns:
        str:
            Extracted text from the PDF.
            Returns an empty string if extraction fails.
    """

    if not pdf_path.exists():
        logging.error("Resume not found: %s", pdf_path)
        return ""

    try:
        text = ""

        with fitz.open(pdf_path) as document:
            for page in document:
                text += page.get_text("text") + "\n"

        return text.strip()

    except Exception as error:
        logging.exception(
            "Failed to extract text from '%s': %s",
            pdf_path.name,
            error,
        )
        return ""
    
def infer_domain(resume_id: str) -> Optional[str]:
    """
    Infer the primary domain of a resume from its resume ID.

    Args:
        resume_id (str):
            Resume identifier (e.g., 'Backend_01', 'ML_AI_03').

    Returns:
        Optional[str]:
            The inferred domain if recognized, otherwise None.
    """

    DOMAIN_PREFIXES = {
        "Frontend": "Frontend",
        "Backend": "Backend",
        "FullStack": "FullStack",
        "DevOps": "DevOps",
        "DataAnalytics": "DataAnalytics",
        "ML_AI": "ML_AI",
    }

    for prefix, domain in DOMAIN_PREFIXES.items():
        if resume_id.startswith(prefix):
            return domain

    logging.warning(
        "Unable to infer domain from resume ID: %s",
        resume_id,
    )

    return None

def load_all_resumes() -> List[Dict[str, Any]]:
    """
    Load every evaluation resume from disk.

    Returns
    -------
    List[Dict[str, Any]]
        List of resume dictionaries containing:

        resume_id
        domain
        filename
        file_path
        text
    """

    if not EVALUATION_RESUME_DIR.exists():

        logging.error(
            "Evaluation directory not found: %s",
            EVALUATION_RESUME_DIR,
        )

        return []

    pdf_files = sorted(
        EVALUATION_RESUME_DIR.glob("*.pdf")
    )

    logging.info(
        "Found %d evaluation resumes.",
        len(pdf_files),
    )

    resumes = []

    for pdf_file in pdf_files:

        resume_id = pdf_file.stem

        domain = infer_domain(resume_id)

        text = extract_text_from_pdf(pdf_file)

        if not text:

            logging.warning(
                "Skipping '%s' because no text was extracted.",
                pdf_file.name,
            )

            continue

        resumes.append(
            {
                "resume_id": resume_id,
                "domain": domain,
                "filename": pdf_file.name,
                "file_path": pdf_file,
                "text": text,
            }
        )

    logging.info(
        "Successfully loaded %d resumes.",
        len(resumes),
    )

    return resumes

def get_word_count(text: str) -> int:
    """
    Count the number of words in extracted resume text.

    Args:
        text (str):
            Resume text.

    Returns:
        int:
            Number of whitespace-separated words.
    """
    return len(text.split())

def main() -> None:
    """
    Test the batch resume loader.

    Loads every evaluation resume and prints a short summary
    to verify that text extraction and domain inference are
    working correctly.
    """

    configure_logging()

    resumes = load_all_resumes()

    if not resumes:
        logging.error("No resumes were loaded.")
        return

    logging.info("-" * 60)
    logging.info("Batch Resume Loader Summary")
    logging.info("-" * 60)

    logging.info("Total resumes loaded: %d", len(resumes))

    total_characters = 0

    for resume in resumes:

        text_length = len(resume["text"])
        word_count = get_word_count(resume["text"])

        total_characters += text_length

        logging.info(
            "%-18s | %-15s | %5d words | %6d characters",
            resume["resume_id"],
            resume["domain"],
            word_count,
            text_length,
        )

    average_length = total_characters / len(resumes)

    logging.info("-" * 60)

    logging.info(
        "Average resume length: %.0f characters",
        average_length,
    )

    logging.info(
        "Batch resume loader verification completed successfully."
    )


if __name__ == "__main__":
    main()