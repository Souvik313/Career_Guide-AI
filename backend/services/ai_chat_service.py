from sqlalchemy.orm import Session

from groq import Groq

from backend.models.career_evaluation import CareerEvaluation
from backend.models.chat_message import ChatMessage
from backend.models.recommendation import Recommendation
from backend.models.resume import Resume
from backend.services.resume_service import ResumeService
from backend.services.recommendation_service import RecommendationService
from backend.services.career_evaluation_service import CareerEvaluationService
from backend.services.chat_message_service import ChatMessageService

from src.config import GROQ_API_KEY

class AIChatService:
    """
    Coordinates the complete AI chat workflow.

    Responsibilities:
    - Load resume
    - Load recommendations
    - Load career evaluation
    - Load conversation history
    - Build LLM prompt
    - Generate AI response
    - Persist chat messages
    """

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

        self.resume_service = ResumeService(db)

        self.recommendation_service = RecommendationService(db)

        self.career_evaluation_service = CareerEvaluationService(db)

        self.chat_message_service = ChatMessageService(db)

        self.client = Groq(
            api_key=GROQ_API_KEY,
        )

    def _format_resume(
        self,
        resume: Resume,
    ) -> str:
        """
        Convert a Resume model into prompt-ready text.
        """

        return f"""
        ===== RESUME =====

        Candidate:
        {resume.candidate_name}

        Resume:

        {resume.parsed_text}
        """.strip()

    def _format_recommendations(
        self,
        recommendations: list[Recommendation],
    ) -> str:
        """
        Convert recommendation objects into prompt-ready text.
        """

        if not recommendations:
            return (
                "===== TOP RECOMMENDED JOBS =====\n\n"
                "No recommendations available."
            )

        lines = [
            "===== TOP RECOMMENDED JOBS =====",
            "",
        ]

        for recommendation in recommendations:

            if recommendation.skills:
                skills = ", ".join(recommendation.skills)
            else:
                skills = "Not Available"

            lines.extend(
                [
                    f"{recommendation.rank}.",
                    "",
                    f"Title: {recommendation.job_title}",
                    f"Company: {recommendation.company_name}",
                    f"Experience Required: {recommendation.exp_years or 'Not Available'}",
                    f"Primary Keyword: {recommendation.primary_keyword or 'Not Available'}",
                    f"English Level: {recommendation.english_level or 'Not Available'}",
                    f"Required Skills: {skills}",
                    f"Similarity Score: {recommendation.similarity_score:.1%}",
                    f"Match Reason: {recommendation.match_reason}",
                    f"Missing Skills Summary: {recommendation.missing_skills_summary or 'Not Available'}",
                    f"Next Step: {recommendation.next_step or 'Not Available'}",
                    "",
                ]
            )

        return "\n".join(lines)

    def _format_career_evaluation(
        self,
        evaluation: CareerEvaluation | None,
    ) -> str:
        """
        Convert a career evaluation into prompt-ready text.
        """

        if evaluation is None:
            return (
                "===== CAREER EVALUATION =====\n\n"
                "No career evaluation available."
            )

        strengths = "\n".join(
            f"- {strength}"
            for strength in evaluation.strengths
        )

        missing_skills = "\n".join(
            f"- {skill}"
            for skill in evaluation.missing_skills
        )

        best_roles = "\n".join(
            f"- {role['role']} ({role['score']}%)"
            for role in evaluation.best_roles
        )

        recommendations = "\n".join(
            f"- {recommendation}"
            for recommendation in evaluation.recommendations
        )

        return f"""
        ===== CAREER EVALUATION =====

        Overall Match Score:
        {evaluation.match_score}%

        Strengths:
        {strengths}

        Missing Skills:
        {missing_skills}

        Recommended Career Paths:
        {best_roles}

        Recommendations:
        {recommendations}
        """.strip()

    def _format_history(
        self,
        history: list[ChatMessage],
    ) -> str:
        """
        Convert chat history into prompt-ready text.
        """

        if not history:
            return (
                "===== CONVERSATION HISTORY =====\n\n"
                "No previous conversation."
            )

        lines = [
            "===== CONVERSATION HISTORY =====",
            "",
        ]

        for message in history:

            if message.role == "user":

                lines.append(
                    f"User: {message.message}"
                )

            else:

                lines.append(
                    f"Assistant: {message.message}"
                )

        return "\n".join(lines)

    def build_context(
        self,
        *,
        user_id: int,
        resume_id: int,
        conversation_id: str,
        user_message: str,
    ) -> str:
        """
        Build the complete prompt that will be sent to the LLM.
        """

        resume = self.resume_service.get_resume_by_id(
            resume_id=resume_id,
            user_id=user_id,
        )

        if resume is None:
            raise ValueError("Resume not found.")

        recommendations = self.recommendation_service.get_recommendations(
            resume_id=resume_id,
            user_id=user_id,
        )

        career_evaluation = (
            self.career_evaluation_service.get_career_evaluation(
                resume_id=resume_id,
                user_id=user_id,
            )
        )

        history = self.chat_message_service.get_conversation_history(
            user_id=user_id,
            conversation_id=conversation_id,
        )

        resume_text = self._format_resume(
            resume,
        )

        recommendation_text = self._format_recommendations(
            recommendations,
        )

        career_text = self._format_career_evaluation(
            career_evaluation,
        )

        history_text = self._format_history(
            history,
        )

        prompt = f"""
        You are CareerCompass AI.

        You are an AI career mentor.

        You help users understand:

        - their uploaded resume
        - their career evaluation
        - the recommended jobs
        - their strengths
        - their missing skills
        - interview preparation
        - learning roadmap
        - career planning

        Only answer using the information provided below.

        If the answer is not available in the context, politely say you do not know instead of inventing information.

        ================ RESPONSE STYLE ================

        Always answer in a concise and professional manner.

        Keep the response between 80 and 180 words or maximum 200 words unless the user explicitly asks for a detailed explanation.

        Prefer bullet points over long paragraphs.

        Never use markdown tables.

        Use short section headings when helpful.

        When explaining why a job was recommended, use this structure:

        Why this job matches:
        • point
        • point
        • point

        Strengths:
        • point
        • point

        Missing skills (if applicable):
        • point
        • point

        Next step:
        Two short actionable sentences.

        When answering simple questions, respond naturally in 2 to 5 sentences.

        Avoid repeating the same information multiple times.

        Do not restate the entire resume or career evaluation unless the user explicitly requests it.

        Base every answer only on the provided context.

        ------------------------------------------------------------

        {resume_text}

        ------------------------------------------------------------

        {career_text}

        ------------------------------------------------------------

        {recommendation_text}

        ------------------------------------------------------------

        {history_text}

        ------------------------------------------------------------

        ===== CURRENT USER QUESTION =====

        {user_message}

        Think carefully before answering.
        First identify which part of the context is relevant.
        Then produce only the final answer.

        Answer:
        """.strip()

        return prompt

    def generate_response(
        self,
        prompt: str,
    ) -> str:
        """
        Send the prompt to the LLM and return its response.
        """

        completion = self.client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are CareerCompass AI, an expert career mentor. "
                        "Answer only using the supplied context. "
                        "Do not hallucinate. "
                        "If information is unavailable, clearly say you do not know."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.3,
            max_tokens=800,
        )

        response = (
            completion
            .choices[0]
            .message
            .content
            .strip()
        )

        return response

    def process_chat(
        self,
        *,
        user_id: int,
        resume_id: int | None,
        conversation_id: str,
        user_message: str,
    ) -> str:
        """
        Complete chat pipeline.
        """

        # STEP 1
        self.chat_message_service.create_message(
            user_id=user_id,
            resume_id=resume_id,
            conversation_id=conversation_id,
            role="user",
            message=user_message,
        )

        # STEP 2
        prompt = self.build_context(
            user_id=user_id,
            resume_id=resume_id,
            conversation_id=conversation_id,
            user_message=user_message,
        )

        # STEP 3
        assistant_response = self.generate_response(
            prompt=prompt,
        )

        # STEP 4
        self.chat_message_service.create_message(
            user_id=user_id,
            resume_id=resume_id,
            conversation_id=conversation_id,
            role="assistant",
            message=assistant_response,
        )

        # STEP 5
        return assistant_response