# app/__init__.py
import os
import sys
from dotenv import load_dotenv
from flask import Flask
from datetime import timedelta
from app.extensions import mongo, jwt  # Importar mongo y jwt desde extensions
from app.routes import auth_bp  # Importar auth_bp

# Añadir el directorio 'app' al PYTHONPATH
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

load_dotenv()  # Cargar variables de entorno desde el archivo .env

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES")))
app.config["SOCIOS_SERVICE_URI"] = os.getenv("SOCIOS_SERVICE_URI")


mongo.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp)

if __name__ == "__main__":
    
    app.run(host="0.0.0.0", port=os.getenv("AUTH_PORT"))
