# app/models.py
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, username, password):
        self.username = username
        self.password_hash = generate_password_hash(password)

    def to_dict(self):
        return {
            "username": self.username,
            "password_hash": self.password_hash
        }

    @staticmethod
    def verify_password(stored_password_hash, provided_password):
        return check_password_hash(stored_password_hash, provided_password)