# app/routes.py
from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
from app.models import User  # Importar User desde app.models
from app.extensions import mongo  # Importar mongo desde extensions
from datetime import datetime  # Importar datetime para manejar fechas
from prometheus_client import Counter, generate_latest
import os

SOCIOS_SERVICE_URI = os.getenv("SOCIOS_SERVICE_URI")  # Obtener la URI del microservicio de socios
auth_bp = Blueprint("auth", __name__)
# Crear un contador
REQUEST_COUNT = Counter('http_requests_total', 'Total number of HTTP requests')

@auth_bp.route('/metrics')
def metrics():
    return Response(generate_latest(), content_type='text/plain')



@auth_bp.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    REQUEST_COUNT.inc()
    id=username
    # Consultar al microservicio de socios para verificar existencia del usuario
    
    response = requests.get(f"{SOCIOS_SERVICE_URI}/socis/{id}")

    if response.status_code != 200:
        return jsonify({"msg": "No eres socio - not found in socios"}), 404
    
    # Verificar si el usuario ya existe en la base de datos de autenticación
    user_data = mongo.db.users.find_one({"username": username})
    if user_data:
        # Verificar la contraseña
        if not User.verify_password(user_data["password_hash"], password):
            return jsonify({"msg": "Bad username or password"}), 401
        
        # Actualizar la fecha de acceso
        mongo.db.users.update_one(
            {"username": username},
            {"$set": {"last_access": datetime.utcnow()}}
        )
    else:
        # Crear un nuevo usuario y guardar en la base de datos
        user = User(username, password)
        user_dict = user.to_dict()
        user_dict["last_access"] = datetime.utcnow()
        mongo.db.users.insert_one(user_dict)
    
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@auth_bp.route("/verify", methods=["POST"])
@jwt_required()
def verify():
    current_user = get_jwt_identity()
    return jsonify(user=current_user), 200
