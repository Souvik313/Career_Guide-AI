from src.resume_parser.resume_parser import ResumeParser
from src.config import RESUME_DATA_DIR
import os


def main():

    resume_path = os.path.join(
        RESUME_DATA_DIR,
        "Souvik_Roy_Resume.pdf"
    )

    parser = ResumeParser()

    text = parser.extract_text(resume_path)

    print("\nExtracted Resume Text:\n")
    print(text)


if __name__ == "__main__":
    main()