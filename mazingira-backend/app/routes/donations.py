from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import Donation, Organization, User
from datetime import datetime

donations_bp = Blueprint('donations', __name__)

@donations_bp.route('/', methods=['POST'])
@jwt_required()
def create_donation():
    data = request.get_json()
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user:
        return jsonify({"error": "User not found"}), 404

    organization_id = data.get('organization_id')
    amount = data.get('amount')
    recurring = data.get('recurring', False)

    if not organization_id or not amount:
        return jsonify({"error": "Organization ID and amount are required"}), 400

    organization = Organization.query.get(organization_id)
    if not organization or not organization.approved:
        return jsonify({"error": "Organization not found or not approved"}), 404

    donation = Donation(
        amount=amount,
        date=datetime.utcnow(),
        recurring=recurring,
        user_id=user.id,
        organization_id=organization.id
    )
    db.session.add(donation)
    db.session.commit()

    return jsonify({"message": "Donation created successfully", "donation": {
        "id": donation.id,
        "amount": donation.amount,
        "date": donation.date,
        "recurring": donation.recurring,
        "organization_id": donation.organization_id
    }}), 201


@donations_bp.route('/', methods=['GET'])
@jwt_required()
def list_donations():
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user:
        return jsonify({"error": "User not found"}), 404

    donations = Donation.query.filter_by(user_id=user.id).all()
    return jsonify({"donations": [
        {
            "id": d.id,
            "amount": d.amount,
            "date": d.date,
            "recurring": d.recurring,
            "organization_id": d.organization_id
        } for d in donations
    ]}), 200


@donations_bp.route('/<int:donation_id>', methods=['DELETE'])
@jwt_required()
def delete_donation(donation_id):
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user:
        return jsonify({"error": "User not found"}), 404

    donation = Donation.query.get(donation_id)

    if not donation or donation.user_id != user.id:
        return jsonify({"error": "Donation not found or not authorized"}), 404

    db.session.delete(donation)
    db.session.commit()

    return jsonify({"message": "Donation deleted successfully"}), 200
