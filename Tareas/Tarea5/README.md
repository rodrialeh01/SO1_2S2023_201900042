# Tarea 5

# ☁️ Google Cloud y Señales a Procesos

## Descripción
Realizar una api usando Flask (python) en una máquina virtual del servicio Compute
Engine (GCP) que contenga un simple `Hola Mundo <Carnet>`, así mismo obtener
el PID del proceso de esta api y enviarle una señal tipo kill (-7) y demostrar que realmente el proceso ha muerto.

## Solución

### Video de la solución final
[https://youtu.be/IS4DgceGWOM](https://youtu.be/IS4DgceGWOM)

### Pasos

1. Crear una instancia en GCP 
2. Instalar python3 y pip3
3. instalar git
4. Conctar la cuenta de git y hacer un `git clone` a este repositorio
5. Instalar Flask
6. instalar flask-cors
7. Crear el archivo app.py
8. Ejecutar el archivo app.py
9. Obtener el PID del proceso con `ps aux | grep python`
10. Copiar pa IP_PUBLICA de la instancia y ejecutarla en el navegador con el puerto `3000` y mostrará el mensaje `Hola Mundo 201900042`
11. Enviar la señal al proceso con `kill -7 <PID>`
12. Verificar que el proceso se haya muerto con `ps aux | grep python`
