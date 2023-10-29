import json
import os

import mysql.connector
import redis
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()

bdsql = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USER'),
    passwd=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_NAME')
)

bdredis = redis.StrictRedis(
    host=os.getenv('DB_HOST'),
    port=6379,
    db=0
)

@app.route('/')
def start():
    return 'Api levantada en Python - SO1_201900042'

@app.route('/entrada', methods=['POST'])
def entrada():
    # Obtiene los datos del body
    carnet = request.json['carnet']
    nombre = request.json['nombre']
    curso = request.json['curso']
    nota = request.json['nota']
    semestre = request.json['semestre']
    anio = request.json['year']
    
    #Conecta con redis y lo manda a su bd
    contador = bdredis.incr('contador_notas')
    key = f'nota_{contador}'
    bdredis.set(key, json.dumps({
        'carnet': carnet,
        'nombre': nombre,
        'curso': curso,
        'nota': nota,
        'semestre': semestre,
        'anio': anio
    }))

    print('Ya se registro en Redis')

    #Conecta con mysql y lo manda a su bd
    sql = "INSERT INTO alumno (carnet, nombre, curso, nota, semestre, year) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (carnet, nombre, curso, nota, semestre, anio)
    cursor = bdsql.cursor()
    cursor.execute(sql, values)
    bdsql.commit()

    print('Ya se registro en MySQL')
    return jsonify({
        'message': 'Se registro correctamente en ambas bases de datos'
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)