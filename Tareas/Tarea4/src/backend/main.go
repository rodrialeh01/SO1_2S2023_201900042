package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type RAM struct {
	Total_Ram         int `json:"total_ram"`
	Ram_en_Uso        int `json:"ram_en_uso"`
	Ram_libre         int `json:"ram_libre"`
	Porcentaje_en_Uso int `json:"porcentaje_en_uso"`
}

func mensaje_inicial(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenido a la API de la Tarea 4 - SO1_201900042")
}

func getRamInfo(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")

	cmd := exec.Command("sh", "-c", "cat /proc/ram_201900042")
	out, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	output := string(out[:])
	fmt.Println(output)
	var ram RAM
	err = json.Unmarshal([]byte(output), &ram)
	if err != nil {
		log.Fatal(err)
	}

	jsonData, err := json.MarshalIndent(ram, "", "	")
	if err != nil {
		log.Fatal(err)
	}

	response.Write(jsonData)

}

func main() {

	mux := mux.NewRouter()

	mux.HandleFunc("/", mensaje_inicial).Methods("GET")
	mux.HandleFunc("/ram", getRamInfo).Methods("GET")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("Servidor corriendo en el puerto 3000 :D")
	fmt.Println("http://localhost:3000/api")
	log.Fatal(http.ListenAndServe(":3000", handlers.CORS(headers, methods, origins)(mux)))

}
