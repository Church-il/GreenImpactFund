from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Organization, User
from ..extensions import db
organizations_bp = Blueprint('organizations', __name__)

# Apply to be an organization
@organizations_bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_organization():
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.role != 'donor':
        return jsonify({"error": "Only donors can apply to be an organization"}), 403

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({"error": "Organization name is required"}), 400

    organization = Organization(name=name, description=description, approved=False)
    db.session.add(organization)
    db.session.commit()

    return jsonify({"message": "Organization application submitted successfully"}), 201

# Approve or reject an organization (Admin only)
@organizations_bp.route('/<int:organization_id>/approve', methods=['PUT'])
@jwt_required()
def approve_organization(organization_id):
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user or user.role != 'admin':
        return jsonify({"error": "Only admins can approve organizations"}), 403

    organization = Organization.query.get(organization_id)
    if not organization:
        return jsonify({"error": "Organization not found"}), 404

    organization.approved = True
    db.session.commit()

    return jsonify({"message": "Organization approved successfully"}), 200

# List all organizations
@organizations_bp.route('/', methods=['GET'])
@jwt_required()
def list_organizations():
    organizations = Organization.query.all()
    return jsonify({"organizations": [
        {
            "id": org.id,
            "name": org.name,
            "description": org.description,
            "approved": org.approved
        } for org in organizations
    ]}), 200

# Delete an organization (Admin only)
@organizations_bp.route('/<int:organization_id>', methods=['DELETE'])
@jwt_required()
def delete_organization(organization_id):
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user or user.role != 'admin':
        return jsonify({"error": "Only admins can delete organizations"}), 403

    organization = Organization.query.get(organization_id)
    if not organization:
        return jsonify({"error": "Organization not found"}), 404

    db.session.delete(organization)
    db.session.commit()

    return jsonify({"message": "Organization deleted successfully"}), 200
