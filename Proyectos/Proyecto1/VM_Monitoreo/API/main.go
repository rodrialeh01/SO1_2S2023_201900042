package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os/exec"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/shirou/gopsutil/cpu"
)

// STRUCTS DE JSON PARA LECTURA DE LOS MODULOS
type RAM struct {
	Total_Ram         int `json:"total_ram"`
	Ram_en_Uso        int `json:"ram_en_uso"`
	Ram_libre         int `json:"ram_libre"`
	Porcentaje_en_Uso int `json:"porcentaje_en_uso"`
}

type Proceso struct {
	Pid            int    `json:"pid"`
	Nombre         string `json:"nombre"`
	Usuario        int    `json:"usuario"`
	Estado         string `json:"estado"`
	Porcentaje_ram int    `json:"porcentaje_ram"`
}

type CPU struct {
	Porcentaje_Cpu int       `json:"porcentaje_cpu"`
	Procesos       []Proceso `json:"procesos"`
}

// STRIUCT DE RETORNO DE LA API
type Data struct {
	Porcentaje_ram int       `json:"porcentaje_ram"`
	Porcentaje_cpu int       `json:"porcentaje_cpu"`
	FechaHora      time.Time `json:"fecha_hora"`
	Procesos       []Proceso `json:"procesos"`
}

// PARA RETORNAR MENSAJE INICIAL Y VERIFICAR QUE LA API ESTA CORRIENDO
func mensaje_inicial(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenido a la API del proyecto 1 - SO1_201900042")
}

// PARA RETORNAR LA INFORMACION DE RAM Y CPU
func envio_data(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	// LECTURA DE LOS MODULOS
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201900042")
	out_ram, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	output_ram := string(out_ram[:])
	fmt.Println(output_ram)

	cmd = exec.Command("sh", "-c", "cat /proc/cpu_201900042")
	out_cpu, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	output_cpu := string(out_cpu[:])
	fmt.Println(output_cpu)

	// PROCESAMIENTO DE LA INFORMACION
	var ram RAM
	err = json.Unmarshal([]byte(output_ram), &ram)
	if err != nil {
		log.Fatal(err)
	}

	var cpu_data CPU
	err = json.Unmarshal([]byte(output_cpu), &cpu_data)
	if err != nil {
		log.Fatal(err)
	}

	p_cpu, err := cpu.Percent(time.Second, false)
	if err != nil {
		log.Fatal(err)
	}

	// CREACION DEL JSON DE RETORNO
	var data Data
	data.Porcentaje_ram = ram.Porcentaje_en_Uso
	data.Porcentaje_cpu = int(math.Round(p_cpu[0]))
	data.FechaHora = time.Now()
	data.Procesos = cpu_data.Procesos

	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintln(w, string(jsonData))
}

func main() {

	mux := mux.NewRouter()

	mux.HandleFunc("/", mensaje_inicial).Methods("GET")
	mux.HandleFunc("/data", envio_data).Methods("GET")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("Servidor corriendo en el puerto 3000 :D")
	fmt.Println("http://localhost:3000/")
	log.Fatal(http.ListenAndServe(":3000", handlers.CORS(headers, methods, origins)(mux)))

}
