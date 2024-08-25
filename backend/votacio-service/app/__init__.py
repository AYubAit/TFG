import os
from flask import Flask, request
from dotenv import load_dotenv
import mysql.connector

load_dotenv()

app = Flask(__name__)

def verify_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"msg": "Missing token"}), 401

    response = requests.post(f"{os.getenv('AUTH_SERVICE_URI')}/auth/verify", headers={"Authorization": token})
    if response.status_code != 200:
        return jsonify({"msg": "Invalid token"}), 401

    request.user = response.json().get('user')

@app.before_request
def before_request():
    if request.endpoint != 'metrics':  # Excluir el endpoint de metrics si es necesario
        verify_token()

def get_db_connection():
    return mysql.connector.connect(
        host='mariadb-votacio',
        user=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD'),
        database=os.getenv('MYSQL_DATABASE'),
        port=os.getenv('MARIADB_PORT'),
        charset='utf8mb4',
        collation='utf8mb4_general_ci'
    )

from app import routes