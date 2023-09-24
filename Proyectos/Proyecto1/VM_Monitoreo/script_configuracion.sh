#!/bin/bash

# Primero instala el docker
sudo apt-get update

sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io -y

# Segundo instalar el paquete stress
sudo apt-get update
sudo apt-get install -y stress

# Tercero instalar git
sudo apt-get install git -y

# Se instala gcc y make
sudo apt install make
sudo apt install build-essential -y

sudo apt-get install manpages-dev
sudo apt install gcc-12 -y

#Instalar python para la api a matar
sudo apt-get install python3 python3-dev -y
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
sudo python3 get-pip.py



# Inicio sesión en dockerhub
sudo docker login -u rodrialeh01 -p Boydrod01-

#Hago pull a la imagen del agente de golang
sudo docker pull rodrialeh01/agente-backed

#hago pull al repositorio de github
git clone "https://rodrialeh01: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@github.com/rodrialeh01/SO1_2S2023_201900042.git"

#Voy a instalar los modulos de C y ejecuto el docker-compose

#1. me ubico en la carpeta de los modulos
#1.1 CPU
cd SO1_2S2023_201900042/Proyectos/Proyecto1/VM_Monitoreo/Modulos/cpu/
make all
sudo insmod cpu_201900042.ko
cp cpu_201900042.ko ../../../../../

#1.2 RAM
cd ../ram/
make all
sudo insmod ram_201900042.ko
cp ram_201900042.ko ../../../../../

# 2. Copio el docker compose a la carpeta main
cd ../../API
sudo cp docker-compose.yml ../../../../../

# 3. Regreso a la carpeta main
cd ../../../../../

# 4. Elimino la carpeta del repositorio
sudo rm -r SO1_2S2023_201900042

# 5. Ejecuto el docker compose
sudo docker-compose up 