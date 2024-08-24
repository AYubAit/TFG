import pytest
from unittest.mock import patch, MagicMock
import requests
from routes import app  # Assuming routes.py is in the same directory and contains the app definition

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@patch('routes.requests.get')
@patch('routes.get_db_connection')
def test_obtener_votaciones_pendientes(mock_get_db_connection, mock_requests_get, client):
    # Mock the database connection and cursor
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_get_db_connection.return_value = mock_conn
    mock_conn.cursor.return_value = mock_cursor

    # Mock the response from the USUARIOS_API_URL
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_requests_get.return_value = mock_response

    # Mock the database query results
    mock_cursor.fetchall.side_effect = [
        [{'id': 1, 'titulo': 'Votacion 1', 'descripcion': 'Descripcion 1', 'fecha_inicio': '2023-01-01', 'fecha_fin': '2023-01-31', 'preguntas': [1, 2]}],
        [],  # No responses for the first votacion
        [{'id': 2, 'titulo': 'Votacion 2', 'descripcion': 'Descripcion 2', 'fecha_inicio': '2023-02-01', 'fecha_fin': '2023-02-28', 'preguntas': [1]}],
        [{'id': 2, 'pregunta_id': 1}],  # Responses for the second votacion
    ]

    # Perform the request
    response = client.get('/pendientes/1')

    # Assert the response
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1  # Only one votacion should be pending
    assert data[0]['id'] == 1

@patch('routes.requests.get')
def test_obtener_votaciones_pendientes_usuario_no_encontrado(mock_requests_get, client):
    # Mock the response from the USUARIOS_API_URL
    mock_response = MagicMock()
    mock_response.status_code = 404
    mock_requests_get.return_value = mock_response

    # Perform the request
    response = client.get('/pendientes/999')

    # Assert the response
    assert response.status_code == 404
    data = response.get_json()
    assert data['message'] == 'Usuario no encontrado'
