import os
from datetime import timedelta

class Config:
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost:5432/mazingira')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'supersecretkey')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    # CORS Configuration
    CORS_HEADERS = 'Content-Type'

    # Environment-specific settings
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    TESTING = os.getenv('TESTING', 'False') == 'True'