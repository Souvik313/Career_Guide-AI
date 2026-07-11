from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner
from src.resume_parser.resume_embedding import ResumeEmbedding
from src.matching.embedding_search import EmbeddingSearch

from src.matching.skill_gap_analyzer import SkillGapAnalyzer
from src.career_advisor.career_advisor import CareerAdvisor

from src.config import RESUME_PATH


def main():

    # ---------------------------------------------------------
    # Parse Resume
    # ---------------------------------------------------------

    print("Parsing resume...")

    parser = ResumeParser()
    resume_text = parser.extract_text(RESUME_PATH)

    # ---------------------------------------------------------
    # Clean Resume
    # ---------------------------------------------------------

    print("Cleaning resume...")

    cleaner = ResumeCleaner()
    cleaned_resume = cleaner.clean(resume_text)

    # ---------------------------------------------------------
    # Resume Embedding
    # ---------------------------------------------------------

    print("Generating embedding...")

    resume_embedder = ResumeEmbedding()

    resume_embedding = resume_embedder.generate_embedding(
        cleaned_resume
    )

    # ---------------------------------------------------------
    # Retrieve Similar Jobs
    # ---------------------------------------------------------

    print("Finding top matching jobs...")

    embedding_search = EmbeddingSearch()
    jobs_df = embedding_search.search_by_embedding(
        resume_embedding,
        top_k=10
    )

    # ---------------------------------------------------------
    # Skill Gap Analysis
    # ---------------------------------------------------------

    print("Analyzing skill gaps...")

    analyzer = SkillGapAnalyzer()

    skill_gap = analyzer.find_missing_skills(
        cleaned_resume,
        jobs_df
    )

    # ---------------------------------------------------------
    # Career Advisor
    # ---------------------------------------------------------

    print("Generating career advice...\n")

    advisor = CareerAdvisor(

        resume_skills=skill_gap["resume_skills"],

        missing_skills=skill_gap["missing_skills"],

        jobs_df=jobs_df

    )

    report = advisor.generate_recommendations()

    # ---------------------------------------------------------
    # Display Report
    # ---------------------------------------------------------

    print("=" * 80)
    print("CAREER REPORT")
    print("=" * 80)

    print(f"\nOverall Match Score : {report['match_score']:.2f}%")

    print("\nRecommended Career Paths")

    for role in report["best_roles"]:
        print(f"• {role}")

    print("\nYour Strengths")

    for skill in report["strengths"]:
        print(f"✓ {skill}")

    print("\nTop Missing Skills")

    for skill in report["missing_skills"]:
        print(f"• {skill}")

    print("\nCareer Recommendations")

    for i, recommendation in enumerate(report["recommendations"], start=1):
        print(f"{i}. {recommendation}")

    print("\n" + "=" * 80)
    print("Career analysis completed successfully!")
    print("=" * 80)


if __name__ == "__main__":
    main()