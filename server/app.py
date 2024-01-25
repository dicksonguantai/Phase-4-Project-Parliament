from flask import request, session
from flask_restful import Api
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import MP, Bill, User, VotingRecord




if __name__ == '__main__':
    app.run(port=5555, debug=True)