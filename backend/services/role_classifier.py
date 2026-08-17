class RoleClassifier:
    """
    Centralized role classification utility.

    Every component in CareerCompass-AI should use
    this class when determining a job category.
    """

    ROLE_KEYWORDS = {

        "Frontend Development": [
            "frontend",
            "front-end",
            "react",
            "angular",
            "vue",
            "ui developer",
            "frontend engineer",
        ],

        "Backend Development": [
            "backend",
            "back-end",
            "node",
            "node.js",
            "express",
            "django",
            "flask",
            "fastapi",
            "api developer",
            "python developer",
            "java developer",
            "sql",
        ],

        "Full Stack Development": [
            "full stack",
            "full-stack",
            "mern",
            "mean",
            "full stack engineer",
        ],

        "Machine Learning / AI": [
            "machine learning",
            "ml engineer",
            "artificial intelligence",
            "ai engineer",
            "data scientist",
            "deep learning",
            "computer vision",
            "nlp",
            "llm",
            "generative ai",
            "AI Specialist",
        ],

        "Data Analytics / BI": [
            "data analyst",
            "business analyst",
            "bi analyst",
            "business intelligence",
            "tableau",
            "power bi",
            "visualization",
            "analytics",
            "reporting",
            "dashboard",
        ],

        "Data Engineering": [
            "data engineer",
            "etl",
            "pipeline",
            "big data",
            "spark",
            "snowflake",
            "airflow",
            "warehouse",
            "data platform",
        ],

        "DevOps / Cloud": [
            "devops",
            "cloud",
            "aws",
            "azure",
            "gcp",
            "kubernetes",
            "docker",
            "site reliability",
            "sre",
            "platform engineer",
        ],

        "Mobile Development": [
            "android",
            "ios",
            "flutter",
            "react native",
            "mobile",
            "mobile developer",
        ],
    }

    DEFAULT_ROLE = "Software Development"

    @classmethod
    def determine_role_category(cls, job_title: str) -> str:
        """
        Returns the best matching role category
        for a given job title.
        """

        title = job_title.lower().strip()

        #
        # IMPORTANT:
        #
        # Order matters.
        #
        # "Senior Tableau Engineer"
        # should become
        # Data Analytics / BI
        #
        # BEFORE it matches "Engineer"
        #

        priority_order = [

            "Machine Learning / AI",

            "Data Analytics / BI",

            "Data Engineering",

            "DevOps / Cloud",

            "Full Stack Development",

            "Backend Development",

            "Frontend Development",

            "Mobile Development",
        ]

        for category in priority_order:

            keywords = cls.ROLE_KEYWORDS[category]

            if any(keyword in title for keyword in keywords):
                return category

        return cls.DEFAULT_ROLE