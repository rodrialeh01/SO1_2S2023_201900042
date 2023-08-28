import json

from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['GET'])
def index():
    return '<h1> Hola mundo 201900042 </h1>'


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=3000)