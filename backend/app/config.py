import os
from datetime import timedelta
import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name="your_cloud_name",
    api_key="your_api_key",
    api_secret="your_api_secret"
)

class Config:
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 
        'postgresql://greenimpactfunduser:6TXgeaQMu5koIC1P0SpXRbNsD48D00lD@dpg-cuk7c70gph6c73bo7h20-a.oregon-postgres.render.com/greenimpactfund'
    ).replace("postgres://", "postgresql://") 

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'werTYSDFGH87DFGhgffg6543')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    # CORS Configuration
    CORS_HEADERS = 'Content-Type'

    # Environment-specific settings
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    TESTING = os.getenv('TESTING', 'False') == 'True'
