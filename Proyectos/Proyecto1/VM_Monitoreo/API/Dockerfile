FROM golang:alpine

WORKDIR /Backend

COPY . .

RUN go mod download

EXPOSE 3000

CMD ["go", "run", "main.go"]