package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var conexion = ConexionMysql()

type Musica struct {
	Title  string `json:"title"`
	Artist string `json:"artist"`
	Year   string `json:"year"`
	Genre  string `json:"genre"`
}
type Response_message struct {
	Message string `json:"message"`
}

func ConexionMysql() (db *sql.DB) {

	dbUser := "root"
	dbPass := "root"
	dbHost := "database"
	dbPort := "3306"
	dbName := "biblioteca"

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

func mensaje_inicial(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenido a la API de la biblioteca de musica - SO1_201900042")
}

func agregarMusica(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")

	var nuevaMusica Musica

	json.NewDecoder((request.Body)).Decode(&nuevaMusica)

	query := `INSERT INTO musica (title, artist, year, genre) VALUES (?,?,?,?);`
	result, err := conexion.Exec(query, nuevaMusica.Title, nuevaMusica.Artist, nuevaMusica.Year, nuevaMusica.Genre)
	if err != nil {
		fmt.Print(err)
	}

	fmt.Print(result)
	res := Response_message{Message: "Musica agregada correctamente"}
	output, _ := json.Marshal(res)
	fmt.Fprintln(response, string(output))

}

func MostrarBiblioteca(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")

	var musicas []Musica

	result, err := conexion.Query("SELECT * FROM musica")
	fmt.Println("result: ", result)

	if err != nil {
		fmt.Print(err)
	}

	for result.Next() {
		var music Musica
		var id int
		err := result.Scan(&id, &music.Title, &music.Artist, &music.Year, &music.Genre)

		if err != nil {
			fmt.Print(err)
		}

		musicas = append(musicas, music)
	}

	json.NewEncoder(response).Encode(musicas)
}

func main() {

	mux := mux.NewRouter()

	mux.HandleFunc("/", mensaje_inicial).Methods("GET")
	mux.HandleFunc("/musica", agregarMusica).Methods("POST")
	mux.HandleFunc("/biblioteca", MostrarBiblioteca).Methods("GET")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("Servidor corriendo en el puerto 3000 :D")
	fmt.Println("http://localhost:3000/api")
	log.Fatal(http.ListenAndServe(":3000", handlers.CORS(headers, methods, origins)(mux)))
}
