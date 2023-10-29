package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"
	"os"
	pb "servidor/grpc-server"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
)

var conexion = ConexionMysql()

func ConexionMysql() (db *sql.DB) {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	conexion_text := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", dbUser, dbPass, dbHost, dbPort, dbName)

	conexion, err := sql.Open("mysql", conexion_text)

	if err != nil {
		fmt.Println("No se conecta")
		fmt.Print(err)
	} else {
		fmt.Println("Conexion exitosa")
	}

	return conexion

}

type Data struct {
	Carnet   int32  `json:"carnet"`
	Nombre   string `json:"nombre"`
	Curso    string `json:"curso"`
	Nota     int32  `json:"nota"`
	Semestre string `json:"semestre"`
	Year     int32  `json:"year"`
}

type server struct {
	pb.UnimplementedGetInfoServer
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	fmt.Println("Recibi del cliente", in.GetCarnet())
	data := Data{
		Carnet:   in.GetCarnet(),
		Nombre:   in.GetNombre(),
		Curso:    in.GetCurso(),
		Nota:     in.GetNota(),
		Semestre: in.GetSemestre(),
		Year:     in.GetYear(),
	}
	fmt.Println(data)

	query := `INSERT INTO alumno (carnet, nombre, curso, nota, semestre, year) VALUES (?,?,?,?,?,?);`
	result, err := conexion.Exec(query, data.Carnet, data.Nombre, data.Curso, data.Nota, data.Semestre, data.Year)
	if err != nil {
		fmt.Print(err)
	}

	fmt.Println(result)

	return &pb.ReplyInfo{Info: "Hola cliente, recibí el comentario"}, nil
}

func main() {
	fmt.Println("Server running on port 3000")
	listen, err := net.Listen("tcp", ":3000")
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}

}
