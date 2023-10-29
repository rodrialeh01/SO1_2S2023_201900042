FROM golang:alpine

WORKDIR /Client

COPY . .

RUN go mod download

EXPOSE 3000

CMD ["go", "run", "client.go"]