FROM node:18-alpine

WORKDIR /Frontend

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]