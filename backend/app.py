from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.resume_routes import router as resume_router
from backend.routes.auth import router as auth_router
from backend.routes.recommendation_routes import router as recommendation_router
from backend.routes.career_evaluation_routes import router as career_evaluation_router
from backend.routes.saved_job_routes import router as saved_job_router
from backend.routes.ai_chat_routes import router as chat_router

from backend.config import cloudinary_config

app = FastAPI(
    title="CareerAdvisor AI API",
    description="AI powered Resume analysis and career recommendation API",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://career-guide-ai-mu.vercel.app",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(resume_router)
app.include_router(auth_router)
app.include_router(recommendation_router)
app.include_router(career_evaluation_router)
app.include_router(saved_job_router)
app.include_router(chat_router)

# Endpoints
@app.get("/")
def home():
    return {
        "message": "Welcome to CareerCompass-AI API",
        "status": "Running"
    }

@app.get("/health")
def health_check():
    return{
        "status": "healthy"
    }