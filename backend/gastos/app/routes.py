from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import os


app = Flask(__name__)

# Configuración de la base de datos MySQL
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)
@app.route('/', methods=['GET'])
def home():
    cursor = mysql.connection.cursor()
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    cursor.close()
    table_names = [table[0] for table in tables]
    return jsonify({"message": "Este es microservicio de gestión de Despesa e Ingresos", "tables": table_names}), 200


@app.route('/despesa', methods=['POST'])
def crear_despesa():
    data = request.json
    if not data:
        return jsonify({'error': 'Bad Request', 'message': 'No JSON data provided'}), 400
    cursor = mysql.connection.cursor()
    cursor.execute("""
        INSERT INTO Despesa (data, import, categoria, metode_pagament, comentari, tiquet_adjunt, id_membre) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (data['data'], data['import'], data['categoria'], data['metode_pagament'], data['comentari'], data['tiquet_adjunt'], data['id_membre']))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Despesa creada'}), 201

@app.route('/despesa/<int:id_despesa>', methods=['GET'])
def obtener_despesa(id_despesa):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM Despesa WHERE id_despesa = %s", (id_despesa,))
    despesa = cursor.fetchone()
    cursor.close()
    if despesa:
        return jsonify(despesa)
    else:
        return jsonify({'message': 'Despesa no encontrada'}), 404

@app.route('/ingres', methods=['POST'])
def crear_ingres():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("""
        INSERT INTO Ingres (data, import, font, categoria, comentari, metode_ingres, id_membre) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (data['data'], data['import'], data['font'], data['categoria'], data['comentari'], data['metode_ingres'], data['id_membre']))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Ingres creado'}), 201

@app.route('/ingres/<int:id_ingress>', methods=['GET'])
def obtener_ingres(id_ingress):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM Ingres WHERE id_ingress = %s", (id_ingress,))
    ingres = cursor.fetchone()
    cursor.close()
    if ingres:
        return jsonify(ingres)
    else:
        return jsonify({'message': 'Ingres no encontrado'}), 404

@app.route('/despesa/fecha/<string:fecha>', methods=['GET'])
def obtener_despesa_por_fecha(fecha):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM Despesa WHERE data = %s", (fecha,))
    despesas = cursor.fetchall()
    cursor.close()
    if despesas:
        return jsonify(despesas)
    else:
        return jsonify({'message': 'No se encontraron Despesas para esa fecha'}), 404

@app.route('/ingres/fecha/<string:fecha>', methods=['GET'])
def obtener_ingres_por_fecha(fecha):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM Ingres WHERE data = %s", (fecha,))
    ingresos = cursor.fetchall()
    cursor.close()
    if ingresos:
        return jsonify(ingresos)
    else:
        return jsonify({'message': 'No se encontraron Ingresos para esa fecha'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
