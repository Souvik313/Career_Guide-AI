import ast
import pandas as pd
import re

from src.config import SKILLS_PATH

class SkillGapAnalyzer:
    """
    Compares resume skills with recommended job skills and identifies 
    the most important missing skills
    """

    SKILL_ALIASES = {
        "machine learning": [
            "machine learning",
            "ml",
        ],

        "large language models": [
            "large language model",
            "large language models",
            "llm",
            "llms",
        ],

        "natural language processing": [
            "natural language processing",
            "nlp",
        ],

        "rest api": [
            "rest api",
            "rest apis",
            "restful api",
        ],

        "javascript": [
            "javascript",
            "js",
        ],

        "typescript": [
            "typescript",
            "ts",
        ],

        "postgresql": [
            "postgresql",
            "postgres",
        ],

        "ci/cd": [
            "ci/cd",
            "ci cd",
            "continuous integration",
        ],

        "tailwind css": [
            "tailwind",
            "tailwind css",
        ],

        "html": [
            "html5",
            "html",
        ]
    }

    SKILL_IMPLICATIONS = {

        "react": [
            "html",
            "css",
            "javascript",
        ],

        "angular": [
            "html",
            "css",
            "typescript",
        ],

        "bootstrap": [
            "html",
            "css",
        ],

        "tailwind css": [
            "html",
            "css",
        ],

        "fastapi": [
            "python",
            "rest api",
        ],

        "express.js": [
            "node.js",
            "javascript",
            "rest api",
        ],

        "mongodb": [
            "nosql",
        ],

        "postgresql": [
            "sql",
        ],

        "tensorflow": [
            "machine learning",
            "deep learning",
        ],

        "pytorch": [
            "machine learning",
            "deep learning",
        ],

        "docker": [
            "containerization",
        ],

        "kubernetes": [
            "containerization",
            "cloud",
        ],
    }

    def __init__(self):
        self.skills = self.load_skills()
        self.alias_lookup = self.build_alias_lookup()

    def build_alias_lookup(self):
        """
        Create a lookup that maps normalized aliases to canonical skill names.
        This keeps alias resolution readable and consistent for every skill.
        """

        alias_lookup = {}

        for canonical, aliases in self.SKILL_ALIASES.items():
            normalized_canonical = self.normalize_skill_text(canonical)
            alias_lookup[normalized_canonical] = normalized_canonical

            for alias in aliases:
                normalized_alias = self.normalize_skill_text(alias)
                alias_lookup[normalized_alias] = normalized_canonical

        return alias_lookup

    def load_skills(self):

        with open(SKILLS_PATH, "r", encoding="utf-8") as f:

            return [line.strip() for line in f if line.strip()]

    # Extract resume skills
    def extract_resume_skills(self, resume_text):

        resume_lower = resume_text.lower()

        extracted = set()

        for skill in self.skills:

            canonical = self.normalize_skill(skill)

            aliases = self.SKILL_ALIASES.get(
                canonical,
                [canonical]
            )

            for alias in aliases:

                pattern = r"\b" + re.escape(alias.lower()) + r"\b"

                if re.search(pattern, resume_lower):

                    # Add the detected canonical skill
                    extracted.add(canonical)

                    # Add all implied skills
                    implied_skills = self.SKILL_IMPLICATIONS.get(
                        canonical,
                        []
                    )

                    extracted.update(
                        self.normalize_skill(skill)
                        for skill in implied_skills
                    )

                    break

        return extracted
    
    # Parse job skills
    def parse_job_skills(self , jobs_df):
        """
        Convert the skills column into a list of (skill, similarity_score)
        tuples so that each skill can be ranked by both frequency and
        the job similarity score.
        """

        all_job_skills = []

        similarity_column = "Similarity Score"

        for _, row in jobs_df.iterrows():
            skills = row.get("Skills")

            if pd.isna(skills):
                continue

            try:

                if isinstance(skills, str):
                    skill_list = ast.literal_eval(skills)

                else:
                    skill_list = skills

                if not isinstance(skill_list, list):
                    skill_list = [skill_list]

            except Exception:
                continue

            # Preserve the similarity score for the whole job and apply it to
            # every skill that appears in that job.
            similarity_score = row.get(similarity_column, 0.0)

            if pd.isna(similarity_score):
                similarity_score = 0.0

            similarity_score = float(similarity_score)

            # Prevent duplicate counting inside the same job.
            seen_skills = set()

            for skill in skill_list:
                normalized_skill = self.normalize_skill(skill)

                if normalized_skill in seen_skills:
                    continue

                seen_skills.add(normalized_skill)
                all_job_skills.append((normalized_skill, similarity_score))

        return all_job_skills

    def normalize_skill_text(self, skill: str):
        """
        Normalize a raw skill name before alias matching.
        The rules are kept explicit so the behavior is easy to follow.
        """

        if not isinstance(skill, str):
            return ""

        normalized = skill.lower().strip()
        normalized = normalized.replace("-", " ")
        normalized = re.sub(r"\s+", " ", normalized)

        return normalized.strip()

    def normalize_skill(self, skill: str):
        """
        Normalize the incoming skill text and resolve it to a canonical name
        via the configured skill aliases.
        """

        normalized = self.normalize_skill_text(skill)
        return self.alias_lookup.get(normalized, normalized)
    
    def find_missing_skills(self , resume_text , jobs_df, min_frequency = 2 , top_n = 10):
        """
        Compare resume skills with recommended jobs
        and return the missing skills.
        The returned structure stays exactly the same, but the ranking now
        uses a similarity-weighted score instead of raw frequency alone.
        """

        # Resume skills
        resume_skills = self.extract_resume_skills(resume_text)

        print("========== RESUME SKILLS ==========")
        for skill in sorted(resume_skills):
            print(skill)
        print("===================================")

        # Job skills, now stored as (skill, similarity_score) pairs so we can
        # compute weighted importance for each skill.
        job_skills = self.parse_job_skills(jobs_df)

        # Aggregate both frequency and similarity importance for each skill.
        skill_scores = {}

        for skill, similarity_score in job_skills:

            if skill in resume_skills:
                continue

            if skill not in skill_scores:
                skill_scores[skill] = {
                    "frequency": 0,
                    "importance_score": 0.0,
                }

            skill_scores[skill]["frequency"] += 1
            skill_scores[skill]["importance_score"] += similarity_score

        # Keep only skills that meet the minimum frequency threshold.
        filtered_skills = [
            (skill, metrics["frequency"], metrics["importance_score"])
            for skill, metrics in skill_scores.items()
            if metrics["frequency"] >= min_frequency
        ]

        # Rank by importance score first, then by frequency as a tiebreaker.
        filtered_skills.sort(
            key=lambda item: (-item[2], -item[1], item[0])
        )

        # Keep only the top N skills and preserve the existing return structure.
        top_missing_skills = [
            (skill, frequency)
            for skill, frequency, _ in filtered_skills[:top_n]
        ]

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
