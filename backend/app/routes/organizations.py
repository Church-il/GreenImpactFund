from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from ..models.models import Organization, User
from ..extensions.extensions import db

organizations_bp = Blueprint('organizations', __name__)

# 🔹 Create an organization (Authenticated users can create it directly without role checks)
@organizations_bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_organization():
    try:
        user_identity = get_jwt_identity()
        user = User.query.get(user_identity['id'])

        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.get_json()
        name = data.get('name', '').strip()
        description = data.get('description', '').strip()

        if not name or not description:
            return jsonify({"error": "Organization name and description are required"}), 400

        # Check if organization already exists
        existing_org = Organization.query.filter_by(name=name).first()
        if existing_org:
            return jsonify({"error": "An organization with this name already exists"}), 409

        # ✅ Automatically approve the organization
        organization = Organization(name=name, description=description, approved=True)
        db.session.add(organization)
        db.session.commit()

        return jsonify({"message": "Organization created successfully", "organization_id": organization.id}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500


# 🔹 List all organizations (Authenticated users only)
@organizations_bp.route('/', methods=['GET'])
@jwt_required()
def list_organizations():
    try:
        user_identity = get_jwt_identity()
        user = User.query.get(user_identity['id'])

        if not user:
            return jsonify({"error": "Unauthorized access. Please log in."}), 401

        organizations = Organization.query.all()

        return jsonify({"organizations": [
            {
                "id": org.id,
                "name": org.name,
                "description": org.description,
                "approved": org.approved
            } for org in organizations
        ]}), 200

    except Exception as e:
        return jsonify({"error": "An error occurred while fetching organizations", "details": str(e)}), 500


# 🔹 Approve an organization (Admin only)
@organizations_bp.route('/<int:organization_id>/approve', methods=['PUT'])
@jwt_required()
def approve_organization(organization_id):
    try:
        user_identity = get_jwt_identity()
        user = User.query.get(user_identity['id'])

        if not user or user.role != 'admin':
            return jsonify({"error": "Only admins can approve organizations"}), 403

        organization = Organization.query.get(organization_id)
        if not organization:
            return jsonify({"error": "Organization not found"}), 404

        if organization.approved:
            return jsonify({"message": "Organization is already approved"}), 200

        organization.approved = True
        db.session.commit()

        return jsonify({"message": f"Organization '{organization.name}' approved successfully"}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500


# 🔹 Delete an organization (Admin only)
@organizations_bp.route('/<int:organization_id>', methods=['DELETE'])
@jwt_required()
def delete_organization(organization_id):
    try:
        user_identity = get_jwt_identity()
        user = User.query.get(user_identity['id'])

        if not user or user.role != 'admin':
            return jsonify({"error": "Only admins can delete organizations"}), 403

        organization = Organization.query.get(organization_id)
        if not organization:
            return jsonify({"error": "Organization not found"}), 404

        db.session.delete(organization)
        db.session.commit()

        return jsonify({"message": f"Organization '{organization.name}' deleted successfully"}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
