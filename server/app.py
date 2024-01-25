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

        except IntegrityError:
            db.session.rollback()
            return {'message': 'User already exists'}, 422
        
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



api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)