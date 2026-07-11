from pprint import pprint

from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner
from src.resume_parser.resume_embedding import ResumeEmbedding

from src.matching.embedding_search import EmbeddingSearch
from src.matching.skill_gap_analyzer import SkillGapAnalyzer

from src.career_advisor.career_advisor import CareerAdvisor

from src.llm.career_report_generator import CareerReportGenerator

from src.config import RESUME_PATH


def main():

    print("Parsing resume...")

    parser = ResumeParser()

    resume_text = parser.extract_text(
        RESUME_PATH
    )

    print("Cleaning resume...")

    cleaner = ResumeCleaner()

    cleaned_resume = cleaner.clean(resume_text)

    print("Generating embedding...")

    embedder = ResumeEmbedding()

    resume_embedding = embedder.generate_embedding(
        cleaned_resume
    )

    print("Finding top matching jobs...")

    search_engine = EmbeddingSearch()

    jobs_df = search_engine.search_by_embedding(
        resume_embedding,
        top_k=10
    )

    print("Analyzing skill gaps...")

    analyzer = SkillGapAnalyzer()

    skill_report = analyzer.find_missing_skills(
        cleaned_resume,
        jobs_df
    )

    print("Generating career advice...")

    advisor = CareerAdvisor(

        jobs_df=jobs_df,

        resume_skills=skill_report["resume_skills"],

        missing_skills=skill_report["missing_skills"]

    )

    career_report = advisor.generate_recommendations()

    print("Generating AI Career Report...\n")

    generator = CareerReportGenerator()

    ai_report = generator.generate_report(
        career_report
    )

    print("=" * 80)
    print("AI CAREER REPORT")
    print("=" * 80)

    pprint(ai_report)

    print("\n" + "=" * 80)
    print("Pipeline completed successfully!")
    print("=" * 80)


if __name__ == "__main__":
    main()