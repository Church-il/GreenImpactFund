from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models import User
from ..extensions import db
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__)

# Signup Route
@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Validate required fields
        if not username or not email or not password:
            return jsonify({"error": "All fields (username, email, password) are required"}), 400

        # Check if the username or email already exists
        if User.query.filter((User.username == username) | (User.email == email)).first():
            return jsonify({"error": "User with this username or email already exists"}), 409

        # Hash the password for secure storage
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully"}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database error occurred. Please try again"}), 500

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


# Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        # Validate required fields
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Find user by email
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid email or password"}), 401

        # Create a JWT token
        access_token = create_access_token(identity={"id": user.id, "role": user.role})

        return jsonify({
            "access_token": access_token,
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }), 200

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


# Get Current User Route
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    try:
        current_user = get_jwt_identity()

        # Find the user by ID from JWT identity
        user = User.query.get(current_user['id'])
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }), 200

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


# Update Password Route
@auth_bp.route('/update-password', methods=['PUT'])
@jwt_required()
def update_password():
    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user['id'])

        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.get_json()
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        # Validate required fields
        if not old_password or not new_password:
            return jsonify({"error": "Old and new passwords are required"}), 400

        # Verify old password
        if not check_password_hash(user.password, old_password):
            return jsonify({"error": "Old password is incorrect"}), 403

        # Update password
        user.password = generate_password_hash(new_password)
        db.session.commit()

        return jsonify({"message": "Password updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
