from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://mongo:27017/authdb"
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"

mongo = PyMongo(app)
jwt = JWTManager(app)

from app.routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)