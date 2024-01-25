from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import MP, Bill, User, VotingRecord


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




api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Bills, '/bills', endpoint='bills')

if __name__ == '__main__':
    app.run(port=5555, debug=True)












    # "first_name": "Mwanzia",
    # "last_name": "Muli",
    # "email": "samuelmuli@gmail.com",
    # "password": "MuliSam",
    # "role": "user"