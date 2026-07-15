from src.resume_parser.resume_parser import ResumeParser
from src.resume_parser.resume_cleaner import ResumeCleaner
# from src.resume_parser.resume_embedding import ResumeEmbedding

# from src.matching.embedding_search import EmbeddingSearch
from src.matching.skill_gap_analyzer import SkillGapAnalyzer

from src.career_advisor.career_advisor import CareerAdvisor

from src.llm.career_report_generator import CareerReportGenerator

class CareerPipeline:
    def run_pipeline(self, resume_path):
        return {
            "status": "Pipeline working"
        }