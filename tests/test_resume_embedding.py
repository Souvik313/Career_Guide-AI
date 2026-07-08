from pathlib import Path

from src.config import RESUME_DATA_DIR
from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner
from src.resume_parser.resume_embedding import ResumeEmbedding


def main():

    # --------------------------------------------------
    # Resume Path
    # --------------------------------------------------

    resume_path = Path(RESUME_DATA_DIR) / "Souvik_Roy_Resume.pdf"

    # --------------------------------------------------
    # Initialize Classes
    # --------------------------------------------------

    parser = ResumeParser()
    cleaner = ResumeCleaner()
    embedder = ResumeEmbedding()

    # --------------------------------------------------
    # Parse Resume
    # --------------------------------------------------

    raw_text = parser.extract_text(resume_path)

    # --------------------------------------------------
    # Clean Resume
    # --------------------------------------------------

    cleaned_text = cleaner.clean(raw_text)

    # --------------------------------------------------
    # Generate Resume Embedding
    # --------------------------------------------------

    embedding = embedder.generate_embedding(cleaned_text)

    # --------------------------------------------------
    # Display Results
    # --------------------------------------------------

    print("\nResume Embedding Generated Successfully!\n")

    print(f"Embedding Shape      : {embedding.shape}")
    print(f"Embedding Dimension  : {len(embedding)}")

    print("\nFirst 10 Values:\n")
    print(embedding[:10])


if __name__ == "__main__":
    main()