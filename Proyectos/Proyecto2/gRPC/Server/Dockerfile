FROM golang:alpine

WORKDIR /Server

COPY . .

RUN go mod download

EXPOSE 3000

CMD ["go", "run", "server.go"]