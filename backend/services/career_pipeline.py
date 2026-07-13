from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner
from src.resume_parser.resume_embedding import ResumeEmbedding

from src.matching.embedding_search import EmbeddingSearch
from src.matching.skill_gap_analyzer import SkillGapAnalyzer

from src.career_advisor.career_advisor import CareerAdvisor

from src.llm.career_report_generator import CareerReportGenerator

from src.config import (
    PROCESSED_DATA_PATH_WITH_SKILLS,
    EMBEDDINGS_PATH,
    FAISS_INDEX_PATH,
    SKILLS_PATH,
    )
import time

class CareerPipeline:
    def __init__(self):
        pass

    def run_pipeline(self , resume_path: str):
            
            pipeline_start = time.perf_counter()
            # STEP 1
            print("=" * 80)
            print("STEP 1: Parsing resume..")
            print("=" * 80)

            stage_start = time.perf_counter()
            
            parser = ResumeParser()
            resume_text = parser.extract_text(resume_path)

            stage_end = time.perf_counter()
            print(f"✅ Resume Parsing completed in {stage_end - stage_start:.2f} seconds\n")

            # STEP 2
            print("=" * 80)
            print("STEP 2 : Cleaning Resume")
            print("=" * 80)

            stage_start = time.perf_counter()

            cleaner = ResumeCleaner()
            clean_resume = cleaner.clean(resume_text)

            stage_end = time.perf_counter()
            print(f"✅ Resume Cleaning completed in {stage_end - stage_start:.2f} seconds\n")

            # STEP 3
            print("=" * 80)
            print("STEP 3 : Generating Resume Embedding..")
            print("=" * 80)

            stage_start = time.perf_counter()

            embedder = ResumeEmbedding()
            resume_embedding = embedder.generate_embedding(clean_resume)
            # Print the shape of the embedding just in case
            print(f"Embedding Shape : {resume_embedding.shape}")

            stage_end = time.perf_counter()
            print(f"✅ Resume Embedding generated in {stage_end - stage_start:.2f} seconds\n")

            # STEP 4
            print("=" * 80)
            print("STEP 4 : Search matching jobs")
            print("=" * 80)

            stage_start = time.perf_counter()

            search_engine = EmbeddingSearch()
            jobs_df = search_engine.search_by_embedding(
                resume_embedding,
                top_k=10
            )

            print(f"Found {len(jobs_df)} matching jobs.")
            print(
                jobs_df[["Position" , "Company Name" , "Similarity Score"]].head(5)
            )
            stage_end = time.perf_counter()
            print(f"✅ Top matching jobs generated in {stage_end - stage_start:.2f} seconds\n")

            # STEP 5
            print("=" * 80)
            print("STEP 5 : Skill Gap Analysis")
            print("=" * 80)

            stage_start = time.perf_counter()

            analyzer = SkillGapAnalyzer()
            analysis = analyzer.find_missing_skills(
                resume_text=clean_resume,
                jobs_df=jobs_df,
            )

            resume_skills = analysis["resume_skills"]
            missing_skills = analysis["missing_skills"]
            top_missing_skills = analysis["top_missing_skills"]
            skill_frequency = analysis["skill_frequency"]

            print(f"Resume Skills Found      : {len(resume_skills)}")
            print(f"Missing Skills Found     : {len(missing_skills)}")
            print("\nTop Missing Skills:")
            for skill in top_missing_skills:
                print(f"• {skill}")

            stage_end = time.perf_counter()
            print(f"✅ Skill gap analysis completed in {stage_end - stage_start:.2f} seconds\n")

            # STEP 6
            print("=" * 80)
            print("STEP 6 : Generating career advice")
            print("=" * 80)

            stage_start = time.perf_counter()

            advisor = CareerAdvisor(
                resume_skills=resume_skills,
                missing_skills=missing_skills,
                jobs_df=jobs_df
            )
            career_report = advisor.generate_recommendations()

            print(f"Overall Match Score : {career_report['match_score']}%")
            print("\nRecommended Career Paths:")

            for role in career_report["best_roles"]:
                print(f"• {role}")

            print("\nTop Recommendations:")

            for rec in career_report["recommendations"][:3]:
                print(f"• {rec}")

            stage_end = time.perf_counter()
            print(f"✅ Career advice generated in {stage_end - stage_start:.2f} seconds\n")

            # STEP 7
            print("=" * 80)
            print("STEP 7 : Generating AI Career Report")
            print("=" * 80)

            stage_start = time.perf_counter()

            generator = CareerReportGenerator()
            ai_report = generator.generate_report(career_report = career_report)
            print("AI Career Report Generated Successfully!")
            print("\nGenerated Sections:")

            for key in ai_report.keys():
                print(f"• {key}")
            stage_end = time.perf_counter()
            print(f"AI career advice generated in {stage_end - stage_start:.2f} seconds\n")

            pipeline_end = time.perf_counter()
            
            print("=" * 80)
            print("PIPELINE EXECUTION SUMMARY")
            print("=" * 80)

            print(f"Total Execution Time : {pipeline_end - pipeline_start:.2f} seconds")

            return {
                "recommended_jobs": jobs_df.to_dict(orient="records"),
                "resume_skills": resume_skills,
                "missing_skills": top_missing_skills,
                "career_report": career_report,
                "ai_report": ai_report
            }