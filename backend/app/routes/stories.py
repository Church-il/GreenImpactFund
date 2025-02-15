from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.models import Story, User
from ..extensions.extensions import db
from datetime import datetime

stories_bp = Blueprint('stories', __name__)

@stories_bp.route('/stories', methods=['POST'])
@jwt_required()
def create_story():
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user:
        return jsonify({"error": "User not found"}), 404

    title = request.form.get('title')
    content = request.form.get('content')
    image = request.files.get('image')

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    image_url = None
    if image:
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result.get("secure_url")

    story = Story(
        title=title,
        content=content,
        image_url=image_url,
        date_posted=datetime.utcnow()
    )
    db.session.add(story)
    db.session.commit()

    return jsonify({
        "message": "Story created successfully",
        "story": {
            "id": story.id,
            "title": story.title,
            "content": story.content,
            "imageUrl": story.image_url,
            "date_posted": story.date_posted
        }
    }), 201

@stories_bp.route('/stories', methods=['GET'])
def list_stories():
    stories = Story.query.order_by(Story.date_posted.desc()).all()
    return jsonify([
        {
            "id": story.id,
            "title": story.title,
            "content": story.content,
            "imageUrl": story.image_url,
            "date_posted": story.date_posted
        } for story in stories
    ]), 200

@stories_bp.route('/stories/<int:story_id>', methods=['GET'])
def get_story(story_id):
    story = Story.query.get(story_id)
    if not story:
        return jsonify({"error": "Story not found"}), 404

    return jsonify({
        "id": story.id,
        "title": story.title,
        "content": story.content,
        "imageUrl": story.image_url,
        "date_posted": story.date_posted
    }), 200

@stories_bp.route('/stories/<int:story_id>', methods=['PUT'])
@jwt_required()
def update_story(story_id):
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity['id'])

    if not user or user.role != 'admin':
        return jsonify({"error": "Only admins can update stories"}), 403

    story = Story.query.get(story_id)
    if not story:
        return jsonify({"error": "Story not found"}), 404

    data = request.get_json()
    story.title = data.get('title', story.title)
    story.content = data.get('content', story.content)
    story.image_url = data.get('imageUrl', story.image_url)
    db.session.commit()

    return jsonify({"message": "Story updated successfully"}), 200

@stories_bp.route('/stories/<int:story_id>', methods=['DELETE'])
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
