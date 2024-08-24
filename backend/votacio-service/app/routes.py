from flask import request, jsonify, Response
from app import app, get_db_connection
from datetime import datetime
from prometheus_client import Counter, generate_latest
 
 
# URL del microservicio externo para obtenir usuaris
USUARIOS_API_URL = 'http://socios-service:3000/valid'
REQUEST_COUNT = Counter('http_requests_total', 'Total number of HTTP requests')
 
 
@app.route('/metrics')
def metrics():
    # Retorna les mètriques de Prometheus en format text pla
    return Response(generate_latest(), content_type='text/plain')
 
@app.route('/votaciones', methods=['POST'])
def crear_votacion():
    # Crea una nova votació a la base de dades
    
    data = request.get_json()
    fecha_inicio = datetime.fromisoformat(data['fecha_inicio'])
    fecha_fin = datetime.fromisoformat(data['fecha_fin'])
     
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO votacion (titulo, descripcion, fecha_inicio, fecha_fin) VALUES (%s, %s, %s, %s)",
        (data['titulo'], data['descripcion'], fecha_inicio, fecha_fin)
    )
    conn.commit()
    cursor.close()
    conn.close()
     
    return jsonify({'message': 'Votación creada'}), 201
 
@app.route('/votaciones/<int:id>', methods=['GET'])
def obtener_votacion(id):
    # Obté una votació específica de la base de dades
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM votacion WHERE id = %s", (id,))
    votacion = cursor.fetchone()
    cursor.close()
    conn.close()
     
    if votacion is None:
        return jsonify({'message': 'Votación no encontrada'}), 404
     
    return jsonify(votacion)
 
@app.route('/preguntas', methods=['POST'])
def crear_pregunta():
    # Crea una nova pregunta a la base de dades, incloent opcions si s'especifiquen
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO pregunta (texto, votacion_id) VALUES (%s, %s)",
        (data['texto'], data['votacion_id'])
    )
    pregunta_id = cursor.lastrowid
    if 'opciones' in data:
        for opcion_texto in data['opciones']:
            cursor.execute(
                "INSERT INTO opcion (texto, pregunta_id) VALUES (%s, %s)",
                (opcion_texto, pregunta_id)
            )
    conn.commit()
    cursor.close()
    conn.close()
     
    return jsonify({'message': 'Pregunta creada'}), 201
 
@app.route('/respuestas', methods=['POST'])
def crear_respuesta():
    # Crea una nova resposta a la base de dades, verificant prèviament l'existència de l'usuari
    REQUEST_COUNT.inc()
    data = request.get_json()
    usuario_id = data['usuario_id']
    response = requests.get(f'{USUARIOS_API_URL}/{usuario_id}')
    if response.status_code != 200:
        return jsonify({'message': 'Usuario no encontrado'}), 404
 
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO respuesta (texto, pregunta_id, usuario_id) VALUES (%s, %s, %s)",
        (data['texto'], data['pregunta_id'], usuario_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
     
    return jsonify({'message': 'Respuesta creada'}), 201
 
@app.route('/resultados/<int:votacion_id>', methods=['GET'])
def obtener_resultados(votacion_id):
    # Obté els resultats d'una votació específica, incloent les respostes per cada pregunta
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pregunta WHERE votacion_id = %s", (votacion_id,))
    preguntas = cursor.fetchall()
    resultados = {}
    for pregunta in preguntas:
        cursor.execute("SELECT texto FROM respuesta WHERE pregunta_id = %s", (pregunta['id'],))
        respuestas = cursor.fetchall()
        resultados[pregunta['texto']] = [r['texto'] for r in respuestas]
    cursor.close()
    conn.close()
     
    return jsonify(resultados)
 
@app.route('/pendientes/<int:usuario_id>', methods=['GET'])
def obtener_votaciones_pendientes(usuario_id):
    # Obté les votacions pendents per a un usuari específic, verificant prèviament l'existència de l'usuari
    response = requests.get(f'{USUARIOS_API_URL}/{usuario_id}')
    if response.status_code != 200:
        return jsonify({'message': 'Usuario no encontrado'}), 404
 
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM votacion")
    votaciones = cursor.fetchall()
    pendientes = []
    for votacion in votaciones:
        cursor.execute(
            "SELECT * FROM respuesta WHERE usuario_id = %s AND pregunta_id IN (SELECT id FROM pregunta WHERE votacion_id = %s)",
            (usuario_id, votacion['id'])
        )
        respondidas = cursor.fetchall()
        if len(respondidas) < len(votacion['preguntas']):
            pendientes.append({
                'id': votacion['id'],
                'titulo': votacion['titulo'],
                'descripcion': votacion['descripcion'],
                'fecha_inicio': votacion['fecha_inicio'].isoformat(),
                'fecha_fin': votacion['fecha_fin'].isoformat()
            })
    cursor.close()
    conn.close()
     
    return jsonify(pendientes)