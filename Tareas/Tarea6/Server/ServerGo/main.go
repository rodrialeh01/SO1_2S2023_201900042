package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"context"
	"strconv"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	httplogger "github.com/jesseokeya/go-httplogger"
)

type ALBUM struct {
	Album  string `json:"album"`
	Artist string `json:"artist"`
	Year   string `json:"year"`
}

type MESSAGE struct {
	Message string `json:"message"`
}

type App struct {
	RedisClient *redis.Client
}

func mensaje_inicial(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenido a la API de la Tarea 6 - SO1_201900042")
}

var ctx = context.Background()

func (app *App) obtenerAlbum(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	cont := 0
	var nuevoAlbum ALBUM

	json.NewDecoder((request.Body)).Decode(&nuevoAlbum)

	fmt.Println(nuevoAlbum)

	albumJSON, err := json.Marshal(nuevoAlbum)
	if err != nil {
		panic(err)
	}
	cont = int(app.RedisClient.Incr(ctx, "contador_album").Val())

	key := fmt.Sprintf("album%d", cont)
	err = app.RedisClient.Set(ctx, key, albumJSON, 0).Err()
	if err != nil {
		panic(err)
	}
	var mensaje MESSAGE
	contstring := strconv.Itoa(cont)
	mensaje.Message = "Album agregado exitosamente, (" + contstring + " albumes registrados)"

	output, _ := json.Marshal(mensaje)
	fmt.Fprintln(response, string(output))
}

func (app *App) obtenerAlbumes(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var mensaje MESSAGE
	var albumes []ALBUM
	var nuevoAlbum ALBUM
	var err error
	var cont int
	var contstring string

	contString := app.RedisClient.Get(ctx, "contador_album").Val()
	cont, _ = strconv.Atoi(contString)
	fmt.Println(cont)
	if cont == 0 {
		mensaje.Message = "No hay albumes registrados"
		output, _ := json.Marshal(mensaje)
		fmt.Fprintln(response, string(output))
	} else {
		for i := 1; i <= cont; i++ {
			key := fmt.Sprintf("album%d", i)
			val := app.RedisClient.Get(ctx, key).Val()
			fmt.Println(val)
			err = json.Unmarshal([]byte(val), &nuevoAlbum)
			if err != nil {
				print("FFFFFFFFFFFFFFFFFFFFFFFFFFF")
				panic(err)
			}
			albumes = append(albumes, nuevoAlbum)
		}
		fmt.Println(albumes)
		output, _ := json.Marshal(albumes)
		contstring = strconv.Itoa(cont)
		mensaje.Message = "Hay " + contstring + " albumes registrados"
		fmt.Fprintln(response, string(output))
	}
}

func main() {
	mux := mux.NewRouter()

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // Si tienes una contraseña configurada en Redis
		DB:       0,
	})

	defer client.Close()

	// Inicializa la aplicación con el cliente Redis
	app := &App{
		RedisClient: client,
	}

	mux.HandleFunc("/api", mensaje_inicial).Methods("GET")
	mux.HandleFunc("/api/album", app.obtenerAlbum).Methods("POST")
	mux.HandleFunc("/api/albumes", app.obtenerAlbumes).Methods("GET")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("Servidor corriendo en el puerto 3000 :D")
	fmt.Println("http://localhost:3000/api")
	log.Fatal(http.ListenAndServe(":3000", httplogger.Golog(handlers.CORS(headers, methods, origins)(mux))))
}
