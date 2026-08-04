from collections import (
    Counter, defaultdict
    )
from backend.services.role_classifier import RoleClassifier

class CareerAdvisor:
    """
    Generates a complete report using

    - resume skills
    - top matching jobs
    - missing skills
    - similarity scores
    """

    STRENGTH_RULES = {
        "Strong Frontend Development Skills": {
            "react",
            "javascript",
            "html",
            "css",
            "typescript",
            "angular",
            "tailwind",
            "bootstrap",
        },

        "Backend Development Experience": {
            "node.js",
            "express.js",
            "fastapi",
            "django",
            "flask",
        },

        "Full Stack Development Expertise": {
            "react",
            "javascript",
            "node.js",
            "express.js",
        },

        "Python Development Skills": {
            "python",
        },

        "Machine Learning & AI Foundations": {
            "machine learning",
            "tensorflow",
            "pytorch",
            "transformers",
            "hugging face",
            "llms",
            "nlp",
        },

        "Data Analytics & Visualization": {
            "sql",
            "tableau",
            "power bi",
            "pandas",
            "statistics",
            "bigquery",
            "snowflake",
        },

        "Cloud Engineering": {
            "azure",
            "aws",
            "gcp",
        },

        "DevOps & Infrastructure Automation": {
            "docker",
            "terraform",
            "kubernetes",
            "azure devops",
            "github actions",
            "ci/cd",
        },

        "Infrastructure as Code": {
            "terraform",
            "bicep",
            "arm templates",
        },

        "Monitoring & Observability": {
            "azure monitor",
            "grafana",
            "prometheus",
            "log analytics",
        },

        "Version Control & Collaborative Development": {
            "git",
            "github",
        },

        "Authentication & Security Concepts": {
            "oauth",
            "jwt",
            "cybersecurity"
            "azure ad",
            "key vault",
        },

        "API Development Experience": {
            "rest apis",
            "rest api"
            "graphql",
        }
    }

    def __init__(self, resume_skills, missing_skills, jobs_df):
        self.resume_skills = resume_skills
        self.missing_skills = missing_skills
        self.jobs_df = jobs_df

    def calculate_match_score(self):
        """
        Calculates an overall career fit score
        from the similarity scores of the
        recommended jobs.
        """

        if self.jobs_df.empty:
            return 0

        average_similarity = self.jobs_df["Similarity Score"].mean()

        score = min(round(average_similarity * 120), 100)

        return score
    
    def identify_strengths(self):

        skills = {
            skill.lower().strip()
            for skill in self.resume_skills
        }

        strengths = []

        for strength, required_skills in self.STRENGTH_RULES.items():

            if len(skills & required_skills) >= max(1, len(required_skills) // 2):
                strengths.append(strength)

        return strengths

    def determine_best_roles(self):

        role_scores = defaultdict(float)

        for _, row in self.jobs_df.iterrows():

            role_category = RoleClassifier.determine_role_category(
                row["Position"]
            )

            score = float(row["Similarity Score"])

            role_scores[role_category] += score

        sorted_roles = sorted(
            role_scores.items(),
            key=lambda x: x[1],
            reverse=True
        )

        return sorted_roles[:3]
    
    def generate_recommendations(self):
        """
        Generates personalized career recommendations
        based on the user's resume and job matches.
        """

        match_score = self.calculate_match_score()
        strengths = self.identify_strengths()
        raw_best_roles = self.determine_best_roles()

        best_roles = []

        if raw_best_roles:

            best_score = max(score for _, score in raw_best_roles)

            best_roles = [
                {
                    "role": role,
                    "score": round((score / best_score) * match_score, 1)
                }
                for role, score in raw_best_roles
            ]
        top_missing = self.missing_skills[:5]

        recommendations = []

        if best_roles:
            recommendations.append(
                f"Focus on {best_roles[0]['role']} roles since they best match your current profile."
            )

        if top_missing:
            recommendations.append(
                "Prioritize learning: "
                + ", ".join(top_missing)
            )

        if strengths:
            recommendations.append(
                "Continue strengthening your expertise in "
                + ", ".join(strengths)
            )

        recommendations.append(
            "Build projects showcasing the missing skills to improve your resume."
        )

        recommendations.append(
            "Keep your GitHub portfolio updated with production-ready projects."
        )

        if match_score < 50:
            recommendations.append(
                "Your profile requires significant improvement before applying to these roles."
            )

        elif match_score < 75:
            recommendations.append(
                "Your profile is competitive, but learning the missing skills will significantly improve your chances."
            )

        else:
            recommendations.append(
                "Your profile is already well aligned with these jobs. Focus on interview preparation and advanced projects."
            )

        return {
            "match_score": match_score,
            "best_roles": best_roles,
            "strengths": strengths,
            "missing_skills": top_missing,
            "recommendations": recommendations
        }