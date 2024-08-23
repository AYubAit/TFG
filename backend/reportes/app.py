from app import create_app
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv

app = create_app()

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
        verify_token()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')