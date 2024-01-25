from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.schema import CheckConstraint

from config import db, bcrypt

class MP(db.Model, SerializerMixin):
    __tablename__ = 'mps'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    affiliation = db.Column(db.String(255))
    constituency = db.Column(db.String(255))
    bills = db.relationship('Bill', back_populates='mp')

    def __repr__(self):
        return f'<MP id={self.id} name={self.name} affiliation={self.affiliation}>'

class Bill(db.Model, SerializerMixin):
    __tablename__ = 'bills'

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

    def __repr__(self):
        return f'<Bill id={self.id} title={self.title} outcome_status={self.outcome_status}>'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('password_hash is not a readable attribute')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User id={self.id} name={self.name} role={self.role} email={self.email}>'

class VotingRecord(db.Model, SerializerMixin):
    __tablename__ = 'voting_records'

    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'))
    vote_status = db.Column(db.Boolean)
    bill = db.relationship('Bill', back_populates='voting_records')

    def __repr__(self):
        return f'<VotingRecord id={self.id} bill_id={self.bill_id} vote_status={self.vote_status}>'
