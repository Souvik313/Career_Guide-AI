from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.resume_routes import router as resume_router

app = FastAPI(
    title="CareerAdvisor AI API",
    description="AI powered Resume analysis and career recommendation API",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
)

# Include API routes
app.include_router(resume_router)

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