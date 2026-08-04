from backend.database.base import Base
from backend.database.connection import engine

import backend.models

def create_tables():

    Base.metadata.create_all(
        bind=engine
    )

if __name__ == "__main__":

    print("Creating database tables...")

    create_tables()

    print("Database tables created successfully.")