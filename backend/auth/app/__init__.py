# app/__init__.py
import os
from dotenv import load_dotenv
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager

load_dotenv()  # Cargar variables de entorno desde el archivo .env

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
SOCIOS_SERVICE_URI = os.getenv("SOCIOS_SERVICE_URI")

mongo = PyMongo(app)
jwt = JWTManager(app)

from app.routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)