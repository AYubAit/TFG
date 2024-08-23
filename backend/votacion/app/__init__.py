import os
from flask import Flask
from dotenv import load_dotenv
import mysql.connector

load_dotenv()

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host='db',
        user=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD'),
        database=os.getenv('MYSQL_DATABASE'),
        charset='utf8mb4',
        collation='utf8mb4_general_ci'
    )

from app import routes