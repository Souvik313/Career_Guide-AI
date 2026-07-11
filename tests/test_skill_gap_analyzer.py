from pathlib import Path

from src.config import RESUME_DATA_DIR

from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner
from src.resume_parser.resume_embedding import ResumeEmbedding

from src.matching.embedding_search import EmbeddingSearch
from src.matching.skill_gap_analyzer import SkillGapAnalyzer


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
    analyzer = SkillGapAnalyzer()

    # --------------------------------------------------
    # Parse Resume
    # --------------------------------------------------

    print("Parsing resume...")

    raw_text = parser.extract_text(resume_path)

    # --------------------------------------------------
    # Clean Resume
    # --------------------------------------------------

    print("Cleaning resume...")

    cleaned_resume = cleaner.clean(raw_text)

    # --------------------------------------------------
    # Resume Embedding
    # --------------------------------------------------

    print("Generating embedding...")

    embedding = embedder.generate_embedding(cleaned_resume)

    # --------------------------------------------------
    # Job Search
    # --------------------------------------------------

    print("Finding top matching jobs...")

    jobs = search_engine.search_by_embedding(
        embedding,
        top_k=10
    )

    # --------------------------------------------------
    # Skill Gap Analysis
    # --------------------------------------------------

    print("Analyzing skill gaps...\n")

    result = analyzer.find_missing_skills(
        cleaned_resume,
        jobs
    )

    # --------------------------------------------------
    # Display Results
    # --------------------------------------------------

    print("=" * 80)
    print("RESUME SKILLS")
    print("=" * 80)

    print(result["resume_skills"])

    print()

    print("=" * 80)
    print("TOP MISSING SKILLS")
    print("=" * 80)

    for skill, frequency in result["top_missing_skills"]:

        print(f"{skill:<25} Required in {frequency} jobs")

    print()

    print("=" * 80)
    print("ANALYSIS COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()