from collections import Counter

class CareerAdvisor:
    """
    Generates a complete report using

    - resume skills
    - top matching jobs
    - missing skills
    - similarity scores
    """

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
        """
        Identify the candidate's major strengths
        based on combinations of resume skills.
        """

        skills = {skill.lower() for skill in self.resume_skills}

        strengths = []

        # Frontend
        if {"react", "javascript", "html", "css"}.issubset(skills):
            strengths.append("Strong Frontend Development Skills")

        # Backend
        if {"node.js", "express.js", "mongodb"}.issubset(skills):
            strengths.append("Backend Development Experience")

        # Full Stack
        if (
            {"react", "javascript"}.issubset(skills)
            and
            {"node.js", "express.js", "mongodb"}.issubset(skills)
        ):
            strengths.append("Full Stack Development Expertise")

        # Version control
        if "git" in skills:
            strengths.append("Version Control & Collaborative Development")

        # Python
        if "python" in skills:
            strengths.append("Python Development Skills")

        # REST APIs
        if "rest api" in skills:
            strengths.append("API Integration Experience")

        # Authentication
        if "oauth" in skills:
            strengths.append("Authentication & Security Concepts")

        return strengths
    
    def determine_best_roles(self):
        """
        Determines the user's strongest career
        paths from the recommended jobs.
        """

        role_counter = Counter()

        titles = self.jobs_df["Position"].tolist()

        for title in titles:

            title = title.lower()

            if any(keyword in title for keyword in [
                "frontend",
                "front-end",
                "react",
                "angular",
                "vue"
            ]):
                role_counter["Frontend Development"] += 1

            elif any(keyword in title for keyword in [
                "backend",
                "back-end",
                "node",
                "django",
                "flask"
            ]):
                role_counter["Backend Development"] += 1

            elif "full stack" in title or "full-stack" in title:
                role_counter["Full Stack Development"] += 1

            elif any(keyword in title for keyword in [
                "machine learning",
                "ml engineer",
                "ai engineer",
                "data scientist"
            ]):
                role_counter["Machine Learning"] += 1

            elif any(keyword in title for keyword in [
                "data engineer",
                "data analyst"
            ]):
                role_counter["Data Engineering"] += 1

            elif any(keyword in title for keyword in [
                "android",
                "ios",
                "mobile"
            ]):
                role_counter["Mobile Development"] += 1

            elif any(keyword in title for keyword in [
                "devops",
                "cloud",
                "site reliability"
            ]):
                role_counter["DevOps / Cloud"] += 1

            else:
                role_counter["Software Development"] += 1

        return [role for role, _ in role_counter.most_common(3)]
    
    def generate_recommendations(self):
        """
        Generates personalized career recommendations
        based on the user's resume and job matches.
        """

        match_score = self.calculate_match_score()

        strengths = self.identify_strengths()

        best_roles = self.determine_best_roles()

        top_missing = self.missing_skills[:5]

        recommendations = []

        if best_roles:
            recommendations.append(
                f"Focus on {best_roles[0]} roles since they best match your current profile."
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