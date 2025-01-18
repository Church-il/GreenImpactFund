from datetime import datetime
from ..extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='donor')  # Options: donor, admin

    # Automatically track creation and updates
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    donations = db.relationship('Donation', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}', role='{self.role}')>"


class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    approved = db.Column(db.Boolean, default=False, nullable=False)  # Approval status
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    donations = db.relationship('Donation', back_populates='organization', cascade="all, delete-orphan")
    stories = db.relationship('Story', back_populates='organization', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Organization(id={self.id}, name='{self.name}', approved={self.approved})>"


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    recurring = db.Column(db.Boolean, default=False, nullable=False)  # One-time or recurring

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='donations')
    organization = db.relationship('Organization', back_populates='donations')

    def __repr__(self):
        return f"<Donation(id={self.id}, amount={self.amount}, user_id={self.user_id}, org_id={self.organization_id})>"


class Story(db.Model):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Foreign key
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)

    # Relationship
    organization = db.relationship('Organization', back_populates='stories')

    def __repr__(self):
        return f"<Story(id={self.id}, title='{self.title}', org_id={self.organization_id})>"
