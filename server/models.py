from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class MP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    affiliation = db.Column(db.String(255))
    constituency = db.Column(db.String(255))
    bills = db.relationship('Bill', back_populates='mp')

class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    submission_date = db.Column(db.Date, nullable=False)
    outcome_status = db.Column(db.Boolean)
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
    mp_id = db.Column(db.Integer, db.ForeignKey('mp.id'))
    mp = db.relationship('MP', back_populates='bills')
    voting_records = db.relationship('VotingRecord', back_populates='bill')

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

class VotingRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'))
    vote_status = db.Column(db.Boolean)
    bill = db.relationship('Bill', back_populates='voting_records')
