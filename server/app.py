from flask import request, session
from flask_restful import Api
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import MP, Bill, User, VotingRecord


class SignUp(Resource):
    def post(self):

        try:
            first_name = request.json['first_name']
            last_name = request.json['last_name']
            email = request.json['email']
            password = request.json['password']
            role = request.json['role']

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)