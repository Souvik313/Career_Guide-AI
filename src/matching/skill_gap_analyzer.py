from collections import Counter
import ast
import pandas as pd
import re

from src.config import SKILLS_PATH

class SkillGapAnalyzer:
    """
    Compares resume skills with recommended job skills and identifies 
    the most important missing skills
    """

    def __init__(self):
        self.skills = self.load_skills()

    def load_skills(self):

        with open(SKILLS_PATH, "r", encoding="utf-8") as f:

            return [line.strip() for line in f if line.strip()]

    # Extract resume skills
    def extract_resume_skills(self, resume_text):

        resume_lower = resume_text.lower()

        extracted = set()

        for skill in self.skills:

            pattern = r"\b" + re.escape(skill.lower()) + r"\b"

            if re.search(pattern, resume_lower):
                extracted.add(skill)

        return extracted
    
    # Parse job skills
    def parse_job_skills(self , jobs_df):
        """
        Convert the skills column into python list
        """

        all_job_skills = []

        for skills in jobs_df["Skills"]:

            if pd.isna(skills):
                continue

            try:

                if isinstance(skills, str):
                    skill_list = ast.literal_eval(skills)

                else:
                    skill_list = skills

                all_job_skills.extend(skill_list)

            except Exception:
                continue

        return all_job_skills
    
    def find_missing_skills(self , resume_text , jobs_df, min_frequency = 2 , top_n = 10):
        """
        Compare resume skills with recommended jobs
        and return thhe missing skills
        """

        # Resume skills
        resume_skills = self.extract_resume_skills(resume_text)

        # Job skills
        job_skills = self.parse_job_skills(jobs_df)

        # Frequency counter
        skill_counter = Counter(job_skills)

        # Remove skills already present in resume
        missing_counter = Counter()
        for skill, count in skill_counter.items():

            if skill not in resume_skills:
                missing_counter[skill] = count

        # Sort by frequency
        filtered_skills = [
            (skill, freq)
            for skill, freq in missing_counter.items()
            if freq >= min_frequency
        ]

        # Sort by frequency (highest first)
        filtered_skills.sort(
            key=lambda x: x[1],
            reverse=True
        )

        # Keep only the top N skills
        top_missing_skills = filtered_skills[:top_n]

        return {
            "resume_skills": sorted(resume_skills),

            "missing_skills": [
                skill
                for skill, _ in top_missing_skills
            ],

            "top_missing_skills": top_missing_skills,

            "skill_frequency": {
                skill: freq
                for skill, freq in top_missing_skills
            }
        }
