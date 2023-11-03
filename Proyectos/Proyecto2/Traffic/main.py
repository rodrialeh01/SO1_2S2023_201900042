import json
from random import randrange

from locust import HttpUser, between, task


class readFile():
    def __init__(self):
        self.data = []

    def getData(self):
        size = len(self.data)
        if size > 0:
            index = randrange(0,size-1) if size > 1 else 0
            return self.data.pop(index)
        else:
            print("No hay mas datos")
            return None
        
    def loadFile(self):
        print("Cargando archivo...")
        try:
            with open('notas1.json', 'r', encoding='utf-8') as file:
                self.data = json.loads(file.read())
        except:
            print("Error al cargar el archivo")
            self.data = []
        
class trafficData(HttpUser):
    wait_time = between(0.1, 0.9)
    data = readFile()
    data.loadFile()
    
    def on_start(self):
        print("Iniciando...")

    @task
    def send_data(self):
        data = self.data.getData()
        if data is not None:
            res = self.client.post("/entrada", json=data)
            response = res.json()
            print(response)
        else:
            print("No hay mas datos")
            self.stop(True)