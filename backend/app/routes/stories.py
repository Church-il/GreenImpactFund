from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.models import Story, Organization, User
from ..extensions.extensions import db
from datetime import datetime

stories_bp = Blueprint('stories', __name__)

@stories_bp.route('/<int:organization_id>', methods=['POST'])
@jwt_required()
def create_story(organization_id):
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user:
        return jsonify({"error": "User not found"}), 404

    organization = Organization.query.get(organization_id)
    if not organization or not organization.approved:
        return jsonify({"error": "Organization not found or not approved"}), 404

    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    story = Story(
        title=title,
        content=content,
        date_posted=datetime.utcnow(),
        organization_id=organization.id
    )
    db.session.add(story)
    db.session.commit()

    return jsonify({"message": "Story created successfully"}), 201

@stories_bp.route('/organization/<int:organization_id>/stories', methods=['GET'])
@jwt_required()
def list_stories(organization_id):
    organization = Organization.query.get(organization_id)
    if not organization or not organization.approved:
        return jsonify({"error": "Organization not found or not approved"}), 404

    stories = Story.query.filter_by(organization_id=organization_id).all()
    return jsonify({"stories": [
        {
            "id": story.id,
            "title": story.title,
            "content": story.content,
            "date_posted": story.date_posted
        } for story in stories
    ]}), 200

@stories_bp.route('/<int:story_id>', methods=['DELETE'])
@jwt_required()
def delete_story(story_id):
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user or user.role != 'admin':
        return jsonify({"error": "Only admins can delete stories"}), 403

    story = Story.query.get(story_id)
    if not story:
        return jsonify({"error": "Story not found"}), 404

    db.session.delete(story)
    db.session.commit()

    return jsonify({"message": "Story deleted successfully"}), 200
