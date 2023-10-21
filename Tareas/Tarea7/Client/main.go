package main

import (
	"context"
	"encoding/json"
	"fmt"
	pb "goclient/grcp-client"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var ctx = context.Background()

type Data struct {
	Carnet   int32  `json:"carnet"`
	Nombre   string `json:"nombre"`
	Curso    string `json:"curso"`
	Nota     int32  `json:"nota"`
	Semestre string `json:"semestre"`
	Year     int32  `json:"year"`
}

type Message struct {
	Message string `json:"message"`
}

func EntradaData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var data Data
	json.NewDecoder(r.Body).Decode(&data)
	sendServer(data)
	mensaje := Message{Message: "Data recibida"}
	output, _ := json.Marshal(mensaje)
	fmt.Fprintln(w, string(output))
}

func sendServer(data Data) {
	conn, err := grpc.Dial("localhost:3000", grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	cl := pb.NewGetInfoClient(conn)

	defer func(conn *grpc.ClientConn) {
		err := conn.Close()
		if err != nil {
			log.Fatalf("Error al cerrar la conexion: %v", err)
		}
	}(conn)

	ret, err := cl.ReturnInfo(ctx, &pb.RequestId{
		Carnet:   data.Carnet,
		Nombre:   data.Nombre,
		Curso:    data.Curso,
		Nota:     data.Nota,
		Semestre: data.Semestre,
		Year:     data.Year,
	})
	if err != nil {
		log.Fatalf("Error al llamar el servidor: %v", err)
	}

	fmt.Println("Respuesta del server:", ret.GetInfo())

}

func mensaje_inicial(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenido a la API de gRCP - SO1_201900042")
}

func main() {
	mux := mux.NewRouter()

	mux.HandleFunc("/api", mensaje_inicial).Methods("GET")
	mux.HandleFunc("/api/insertar", EntradaData).Methods("POST")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("Servidor corriendo en el puerto 4000 :D")
	fmt.Println("http://localhost:4000/api")
	log.Fatal(http.ListenAndServe(":4000", handlers.CORS(headers, methods, origins)(mux)))
}
