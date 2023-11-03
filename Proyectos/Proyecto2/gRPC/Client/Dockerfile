FROM golang:alpine

WORKDIR /Client

COPY . .

RUN go mod download

EXPOSE 4000

CMD ["go", "run", "client.go"]