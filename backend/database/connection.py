from sqlalchemy import create_engine
from backend.core.config import settings

engine = create_engine(
    url=settings.DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)