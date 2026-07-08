from pathlib import Path

from src.config import RESUME_DATA_DIR
from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner


def main():

    # -------------------------------------------------
    # Resume Path
    # -------------------------------------------------

    resume_path = Path(RESUME_DATA_DIR) / "Souvik_Roy_Resume.pdf"

    # -------------------------------------------------
    # Initialize Classes
    # -------------------------------------------------

    parser = ResumeParser()
    cleaner = ResumeCleaner()

    # -------------------------------------------------
    # Parse Resume
    # -------------------------------------------------

    raw_text = parser.extract_text(resume_path)

    print("=" * 80)
    print("RAW RESUME")
    print("=" * 80)

    print(raw_text)

    # -------------------------------------------------
    # Clean Resume
    # -------------------------------------------------

    cleaned_text = cleaner.clean(raw_text)

    print("\n")
    print("=" * 80)
    print("CLEANED RESUME")
    print("=" * 80)

    print(cleaned_text)


if __name__ == "__main__":
    main()