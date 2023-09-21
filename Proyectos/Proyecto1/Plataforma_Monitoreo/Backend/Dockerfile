FROM node:18-alpine

WORKDIR /api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 4000

# Define el comando que se ejecutará al iniciar el contenedor
CMD ["npm", "start"]
