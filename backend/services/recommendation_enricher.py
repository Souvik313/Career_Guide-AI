import ast
from backend.services.role_classifier import RoleClassifier

class RecommendationEnricher:
    """
    Enriches raw job recommendations with
    career-coaching information.

    This service does not interact with the database.
    It only transforms recommendation data.
    """

    ROLE_SKILLS = {
        "Frontend Development": [
            "react",
            "react.js"
            "javascript",
            "typescript",
            "css",
            "tailwind css",
            "redux",
            "next.js",
            "vite",
            "jest",
            "playwright",
            "testing libraries",
            "web performance",
            "accessibility",
            "responsive design",
            "state management",
            "component design",
            "design systems",
            "html",
        ],
        "Backend Development": [
            "python",
            "fastapi",
            "django",
            "flask",
            "node.js",
            "express.js",
            "rest api",
            "sql",
            "postgresql",
            "mongodb",
            "microservices",
            "redis",
            "graphql",
            "rabbitmq",
            "kafka",
            "ci/cd",
            "cloud services",
            "docker",
            "authentication",
            "api design",
        ],
        "Full Stack Development": [
            "react",
            "javascript",
            "typescript",
            "node.js",
            "express.js",
            "mongodb",
            "sql",
            "rest api",
            "next.js",
            "prisma",
            "postgres",
            "redis",
            "authentication",
            "testing",
            "deployment",
            "api design",
            "docker",
            "ci/cd",
        ],
        "Machine Learning / AI": [
            "python",
            "machine learning",
            "tensorflow",
            "pytorch",
            "scikit-learn",
            "pandas",
            "numpy",
            "nlp",
            "large language models",
            "llm"
            "genai",
            "prompt engineering",
            "langchain",
            "transformers",
            "mlops",
            "vector databases",
            "data pipelines",
        ],
        "Data Analytics / BI": [
            "python",
            "sql",
            "tableau",
            "power bi",
            "pandas",
            "numpy",
            "data visualization",
            "analytics",
            "business intelligence",
        ],
        "Data Engineering": [
            "python",
            "sql",
            "spark",
            "airflow",
            "etl",
            "data pipelines",
            "warehouse",
            "snowflake",
            "dbt",
        ],
        "Mobile Development": [
            "android",
            "ios",
            "flutter",
            "react native",
            "swift",
            "kotlin",
            "mobile ui/ux",
            "app performance",
            "firebase",
            "mobile testing",
            "push notifications",
        ],
        "DevOps / Cloud": [
            "docker",
            "kubernetes",
            "aws",
            "azure",
            "gcp",
            "linux",
            "terraform",
            "ci/cd",
            "github actions",
            "monitoring",
            "observability",
            "cloud networking",
            "security",
        ],
        "Software Development": [
            "python",
            "java",
            "javascript",
            "c++",
            "git",
            "rest api",
            "system design",
            "data structures",
            "algorithms",
            "testing",
            "debugging",
            "software architecture",
            "agile",
            "version control",
            "cloud fundamentals",
        ],
    }

    ROLE_ACTIONS = {

        "Backend Development":
            "Learn {skills}, then build and deploy a production-ready FastAPI REST API with JWT authentication and PostgreSQL on Railway or Render.",

        "Frontend Development":
            "Strengthen {skills}, then build a modern React dashboard using TailwindCSS and deploy it on Vercel.",

        "Full Stack Development":
            "Improve {skills}, then build a complete full-stack application using React, FastAPI, PostgreSQL, and Docker.",

        "Machine Learning / AI":
            "Focus on {skills}, then build an end-to-end RAG application using FastAPI, FAISS, Hugging Face embeddings, and Groq LLM.",

        "Data Analytics / BI":
            "Learn {skills}, then create an interactive Tableau/Power BI dashboard using a real-world dataset and publish the project on GitHub.",

        "Data Engineering":
            "Master {skills}, then build an ETL pipeline using Airflow, PostgreSQL, and Docker.",

        "DevOps / Cloud":
            "Practice {skills}, then containerize and deploy a cloud-native application using Docker, Kubernetes, and Azure/AWS.",

        "Mobile Development":
            "Improve {skills}, then publish a cross-platform Flutter or React Native application.",

        "Software Development":
            "Develop {skills}, then build a production-ready software project emphasizing clean architecture and testing."
    }

    def __init__(self, resume_skills, missing_skills):
        self.resume_skills = {
            skill.lower().strip()
            for skill in resume_skills
        }

        self.missing_skills = [
            skill.strip()
            for skill in missing_skills
        ]

    def find_relevant_skills(self, role_category):
        """
        Finds resume skills relevant to the recommended role.
        """

        role_skills = self.ROLE_SKILLS.get(
            role_category,
            [],
        )

        return [
            skill
            for skill in role_skills
            if skill in self.resume_skills
        ]

    def generate_match_reason(
        self,
        job_title,
        similarity_score,
        role_category,
    ):
        """
        Generates a deterministic explanation of
        why the candidate matches the role.
        """

        relevant_skills = self.find_relevant_skills(
            role_category
        )

        if relevant_skills:
            skills_text = ", ".join(
                relevant_skills[:5]
            )

            return (
                f"This {role_category.lower()} role aligns "
                f"with your existing {skills_text} skills. "
                f"The resume-job similarity score is "
                f"{similarity_score:.1%}."
            )

        return (
            f"This {role_category.lower()} role has a "
            f"resume-job similarity score of "
            f"{similarity_score:.1%}, indicating "
            f"potential alignment with your profile."
        )

    def get_role_missing_skills(self, role_category):
        """
        Returns the missing skills that are specifically
        important for the given role.
        """

        role_skills = {
            skill.lower()
            for skill in self.ROLE_SKILLS.get(role_category, [])
        }

        relevant_missing = [
            skill
            for skill in self.missing_skills
            if skill.lower() in role_skills
        ]

        return relevant_missing

    def generate_missing_skills_summary(self, role_category):

        role_missing = self.get_role_missing_skills(role_category)

        if role_missing:
            selected = role_missing[:5]
        else:
            selected = self.missing_skills[:5]

        return (
            "Key skills to strengthen for this role: "
            + ", ".join(selected)
            + "."
        )

    def generate_next_step(self, role_category):

        role_missing = self.get_role_missing_skills(role_category)

        if role_missing:
            selected = role_missing[:3]
        else:
            selected = self.missing_skills[:3]

        skills = ", ".join(selected)

        template = self.ROLE_ACTIONS.get(
            role_category,
            "Strengthen {skills} and build a portfolio project."
        )

        return template.format(skills=skills)

    def enrich_recommendation(
        self,
        job_title,
        company_name,
        similarity_score,
        rank,
        experience_years,
        primary_keyword,
        english_level,
        skills,
    ):
        """
        Creates one enriched recommendation.
        """

        role_category = RoleClassifier.determine_role_category(
            job_title
        )
        # Convert string representation into list
        if isinstance(skills, str):
            try:
                skills = ast.literal_eval(skills)
            except Exception:
                skills = []

        if not isinstance(skills, list):
            skills = []

        return {
            "job_title": job_title,
            "company_name": company_name,
            "similarity_score": float(similarity_score),
            "rank": rank,
            "experience_years": experience_years,
            "primary_keyword": primary_keyword,
            "english_level": english_level,
            "skills": skills,
            "role_category": role_category,
            "match_reason": self.generate_match_reason(
                job_title=job_title,
                similarity_score=float(similarity_score),
                role_category=role_category,
            ),
            "missing_skills_summary": (
                self.generate_missing_skills_summary(role_category)
            ),
            "next_step": self.generate_next_step(
                role_category
            ),
        }

    def enrich_recommendations(self, jobs_df):
        """
        Enriches all recommended jobs from the
        DataFrame returned by the embedding search engine.
        """

        enriched = []

        for rank, (_, row) in enumerate(
            jobs_df.iterrows(),
            start=1,
        ):
            recommendation = self.enrich_recommendation(
                job_title=row["Position"],
                company_name=row["Company Name"],
                similarity_score=row["Similarity Score"],
                rank=rank,
                experience_years=row["Exp Years"],
                primary_keyword=row["Primary Keyword"],
                english_level=row["English Level"],
                skills=row["Skills"],
            )

            enriched.append(recommendation)

        return enriched