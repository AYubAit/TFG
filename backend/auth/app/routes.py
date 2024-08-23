# app/routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
from app import mongo, SOCIOS_SERVICE_URI

auth_bp = Blueprint("auth", __name__)



@auth_bp.route("/verify", methods=["POST"])
@jwt_required()
def verify():
    current_user = get_jwt_identity()
    return jsonify(user=current_user), 200

@auth_bp.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    
    # Verificar credenciales en la base de datos de autenticación
    user = mongo.db.users.find_one({"username": username, "password": password})
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Consultar al microservicio de socios para verificar existencia del usuario
    response = requests.get(f"{SOCIOS_SERVICE_URI}/socios/{username}")
    if response.status_code != 200:
        return jsonify({"msg": "User not found in socios"}), 404
    
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200