import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

cloudinary.config(
    cloud_name=os.getenv("dcltyrxr9"),
    api_key=os.getenv("449717595926682"),
    api_secret=os.getenv("zG_3EzQ-Rc73HY7k2wrHWaODEzE")
)
