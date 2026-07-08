from pathlib import Path

from src.config import RESUME_DATA_DIR

from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner
from src.resume_parser.resume_embedding import ResumeEmbedding

from src.matching.embedding_search import EmbeddingSearch


def main():

    # --------------------------------------------------
    # Resume Path
    # --------------------------------------------------

    resume_path = Path(RESUME_DATA_DIR) / "Souvik_Roy_Resume.pdf"

    # --------------------------------------------------
    # Initialize Modules
    # --------------------------------------------------

    parser = ResumeParser()
    cleaner = ResumeCleaner()
    embedder = ResumeEmbedding()
    search_engine = EmbeddingSearch()

    # --------------------------------------------------
    # Parse Resume
    # --------------------------------------------------

    print("\nParsing resume...")
    raw_text = parser.extract_text(resume_path)

    # --------------------------------------------------
    # Clean Resume
    # --------------------------------------------------

    print("Cleaning resume...")
    cleaned_text = cleaner.clean(raw_text)

    # --------------------------------------------------
    # Generate Resume Embedding
    # --------------------------------------------------

    print("Generating resume embedding...")
    resume_embedding = embedder.generate_embedding(cleaned_text)

    # --------------------------------------------------
    # Search Similar Jobs
    # --------------------------------------------------

    print("Searching for matching jobs...\n")

    results = search_engine.search_by_embedding(
        resume_embedding,
        top_k=10
    )

    # --------------------------------------------------
    # Display Results
    # --------------------------------------------------

    print("=" * 120)
    print("TOP 10 JOB RECOMMENDATIONS")
    print("=" * 120)

    display_columns = [
        "Position",
        "Company Name",
        "Exp Years",
        "Primary Keyword",
        "English Level",
        "Similarity Score",
    ]

    print(results[display_columns].to_string(index=False))

    print("\n")
    print("=" * 120)
    print("Recommendation pipeline completed successfully!")
    print("=" * 120)


if __name__ == "__main__":
    main()