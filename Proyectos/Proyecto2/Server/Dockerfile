FROM node:18-alpine

WORKDIR /Backend

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]