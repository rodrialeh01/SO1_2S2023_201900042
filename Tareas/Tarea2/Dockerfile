#build stage
FROM golang:1.19.3-alpine3.17 AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY . .
RUN go get -d -v ./...
RUN go build -o app -v .

ENTRYPOINT [ "./app" ]

#final stage
#FROM alpine:latest
#RUN apk --no-cache add ca-certificates
#COPY --from=builder /go/bin/app /app
#ENTRYPOINT /app
#LABEL Name=so12s2023201900042 Version=0.0.1
#EXPOSE 3000
