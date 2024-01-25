from flask import Flask, request, session
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from sqlalchemy.exc import IntegrityError
from datetime import datetime

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)

class Signup(Resource):
    def post(self):

        try:
            first_name = request.json['first_name']
            last_name = request.json['last_name']
            email = request.json['email']
            password = request.json['password']
            role = request.json['role']

            if not first_name or not last_name or not password:
                return {'message': 'Invalid user data'}, 422

            user = User(
                first_name=first_name,
                last_name=last_name,
                email=email,
                role=role
            )

            user.password_hash = password

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return {
                'message': 'User created successfully'
            }, 201

        except IntegrityError as e:
            db.session.rollback()
            error_info = str(e.orig)
            if 'unique constraint' in error_info.lower():
                return {'message': 'User with this email already exists'}, 422
            else:
                return {'message': 'An error occurred during registration'}, 500
        
    def patch(self):
        try:
            email = request.json['email']
            password = request.json['password']

            if not email or not password:
                return {'message': 'Invalid user data'}, 422

            user = User.query.filter_by(email=email).first()

            if not user:
                return {'message': 'User not found'}, 404

            user.password_hash = password
            db.session.commit()

            session['user_id'] = user.id

            return {
                'message': 'Password updated successfully'
            }, 200
        
        except IntegrityError:
            db.session.rollback()
            return {'message': 'An error occurred'}, 422
        

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')

        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return {
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                    'role': user.role
                }, 200
            else:
                return {'message': 'User not found'}, 404
            
        else:
            return {'message': 'Please log in'}, 401


class Login(Resource):
    def post(self):
        email = request.json['email']
        password = request.json['password']

        user = User.query.filter_by(email=email).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'role': user.role
            }, 201
        else:
            return {'message': 'Invalid email or password'}, 401
        

class Logout(Resource):
    def delete(self):
        session['user_id'] = None

        return {
            'message': 'Logged out successfully'
        }, 200
    

class Bills(Resource):
    def get(self):
        user_id = session.get('user_id')

        if user_id:
            bills = Bill.query.all()

            return {
                'bills': [{
                    'title': bill.title,
                    'upvotes': bill.upvotes,
                    'downvotes': bill.downvotes,
                    'outcome_status': bill.outcome_status,
                    'mp_first_name': bill.mp.first_name,
                    'mp_last_name': bill.mp.last_name,
                    'mp_affiliation': bill.mp.affiliation
                } for bill in bills]
            }, 200
        
        else:
            return {'message': 'Please log in'}, 401
        
        
    def post(self):

        user_id = session.get('user_id')

        if user_id:
            title = request.json['title']
            description = request.json['description']
            mp_first_name = request.json['mp_first_name']
            mp_last_name = request.json['mp_last_name']
            mp_affiliation = request.json['mp_affiliation']
            mp_constituency = request.json['mp_constituency']

            mp = MP.query.filter_by(first_name=mp_first_name, last_name=mp_last_name).first()

            if not mp:
                return {'message': 'MP not found'}, 404

            bill = Bill(
                title = title,
                description = description,
                mp_id = mp.id,
                submission_date = datetime.now(),
            )

            db.session.add(bill)
            db.session.commit()

            return {
                'message': 'Bill created successfully'
            }, 201

        else:
            return {'message': 'User not authenticated'}, 401


class BillsByID(Resource):
    def get(self, bill_id):

        user_id = session.get('user_id')

        if user_id:

            bill = Bill.query.filter_by(id=bill_id).first()

            if bill:
                return {
                    'title': bill.title,
                    'description': bill.description,
                    'submission_date': bill.submission_date.isoformat(),
                    'upvotes': bill.upvotes,
                    'downvotes': bill.downvotes,
                    'outcome_status': bill.outcome_status
                }, 200
            else:
                return {'message': 'Bill not found'}, 404
        
        else:
            return {'message': 'User not authenticated'}, 401
        
    def patch(self, bill_id):
        user_id = session.get('user_id')

        if not user_id:
            return {'message': 'User not authenticated'}, 401
        
        bill = Bill.query.filter_by(id=bill_id).first()
        if not bill:
            return {'message': 'Bill not found'}, 404
            
        data = request.get_json()
        if 'upvotes' in data:
            bill.upvotes += 1
        elif 'downvotes' in data:
            bill.downvotes += 1
        else:
            return {'message': 'Invalid request'}, 400
        
        bill.outcome_status = bill.upvotes > bill.downvotes
            
        db.session.commit()
        return {
            'message': 'Vote casted successfully',
            'upvotes': bill.upvotes,
            'downvotes': bill.downvotes,
            'outcome_status': bill.outcome_status
        }, 200



api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Bills, '/bills', endpoint='bills')
api.add_resource(BillsByID, '/bills/<int:bill_id>', endpoint='bills_by_id')

if __name__ == '__main__':
    import os
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 5555))
    app.run(host=host, port=port, debug=True)


