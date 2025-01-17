from flask import Flask
from flask_cors import CORS
from .extensions import db, jwt
from .config import Config
from .routes.auth import auth_bp
from .routes.donations import donations_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(donations_bp, url_prefix='/donations')

    # Root route
    @app.route('/')
    def index():
        return {"message": "Welcome to Mazingira API!"}

    return app

# Initialize database
if __name__ == '__main__':
    from .extensions import db
    from .models import User, Organization, Donation, Story

    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
