from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .extensions.extensions import db, jwt, migrate
from .config import Config
from .routes.auth import auth_bp
from .routes.donations import donations_bp
from .routes.organizations import organizations_bp
from .routes.stories import stories_bp

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(donations_bp, url_prefix='/donations')
    app.register_blueprint(organizations_bp, url_prefix='/organizations')
    app.register_blueprint(stories_bp, url_prefix='/stories')

    # Root route
    @app.route('/')
    def index():
        return {"message": "Welcome to Mazingira API!"}

    return app

if __name__ == '__main__':
    from .extensions.extensions import db
    from .models.models import User, Organization, Donation, Story

    app = create_app()

    app.run(debug=True)