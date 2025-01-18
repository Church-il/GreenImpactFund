from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions.extensions import db
from ..models.models import Donation, Organization, User
from datetime import datetime

donations_bp = Blueprint('donations', __name__)

# Create a donation
@donations_bp.route('/', methods=['POST'])
@jwt_required()
def create_donation():
    try:
        data = request.get_json()
        user_identity = get_jwt_identity()

        # Retrieve the authenticated user
        user = User.query.get(user_identity['id'])
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Extract and validate donation details
        organization_id = data.get('organization_id')
        amount = data.get('amount')
        recurring = data.get('recurring', False)

        if not organization_id or not amount:
            return jsonify({"error": "Organization ID and amount are required"}), 400

        # Verify organization exists and is approved
        organization = Organization.query.get(organization_id)
        if not organization or not organization.approved:
            return jsonify({"error": "Organization not found or not approved"}), 404

        # Create and save the donation
        donation = Donation(
            amount=amount,
            date=datetime.utcnow(),
            recurring=recurring,
            user_id=user.id,
            organization_id=organization.id
        )
        db.session.add(donation)
        db.session.commit()

        return jsonify({
            "message": "Donation created successfully",
            "donation": {
                "id": donation.id,
                "amount": donation.amount,
                "date": donation.date,
                "recurring": donation.recurring,
                "organization_id": donation.organization_id
            }
        }), 201

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# List all donations by the current user
@donations_bp.route('/', methods=['GET'])
@jwt_required()
def list_donations():
    try:
        user_identity = get_jwt_identity()

        # Retrieve the authenticated user
        user = User.query.get(user_identity['id'])
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Fetch all donations made by the user
        donations = Donation.query.filter_by(user_id=user.id).all()

        return jsonify({
            "donations": [
                {
                    "id": d.id,
                    "amount": d.amount,
                    "date": d.date,
                    "recurring": d.recurring,
                    "organization_id": d.organization_id
                } for d in donations
            ]
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# Delete a donation
@donations_bp.route('/<int:donation_id>', methods=['DELETE'])
@jwt_required()
def delete_donation(donation_id):
    try:
        user_identity = get_jwt_identity()

        # Retrieve the authenticated user
        user = User.query.get(user_identity['id'])
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Find the donation by ID
        donation = Donation.query.get(donation_id)
        if not donation or donation.user_id != user.id:
            return jsonify({"error": "Donation not found or not authorized"}), 404

        # Delete the donation
        db.session.delete(donation)
        db.session.commit()

        return jsonify({"message": "Donation deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
