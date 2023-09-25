package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net"
	"net/http"
	"os"
	"os/exec"
	"syscall"
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
	Ip             string    `json:"ip"`
	Procesos       []Proceso `json:"procesos"`
}

type PC_info struct {
	Ip string `json:"ip"`
}

type Kill struct {
	Pid int `json:"pid"`
}
type Message struct {
	Message string `json:"message"`
}

// PARA RETORNAR MENSAJE INICIAL Y VERIFICAR QUE LA API ESTA CORRIENDO
func mensaje_inicial(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenido a la API del proyecto 1 - SO1_201900042")
}
func obtenerDireccionIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		fmt.Println(err.Error())
		return ""
	}

	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}

	return ""
}

// PARA RETORNAR LA INFORMACION DE RAM Y CPU
func envio_ip() {
	url := "http://34.139.202.248:4000/ips"
	var jsondata PC_info
	jsondata.Ip = obtenerDireccionIP()

	jsonData, err := json.Marshal(jsondata)
	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error al crear la solicitud:", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error al hacer la solicitud:", err)
		return
	}
	defer resp.Body.Close()

	// Verificar el código de estado de la respuesta
	if resp.StatusCode == http.StatusOK {
		fmt.Println("Solicitud POST exitosa")
	} else {
		fmt.Println("Error en la solicitud. Código de estado:", resp.StatusCode)
	}
}

func enviarInfo() {

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
	data.Porcentaje_ram = int(ram.Ram_en_Uso/ram.Total_Ram) * 100
	data.Porcentaje_cpu = int(math.Round(p_cpu[0]))
	data.FechaHora = time.Now()
	data.Ip = obtenerDireccionIP()
	fmt.Println(data.Porcentaje_ram)
	data.Procesos = cpu_data.Procesos

	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Fatal(err)
	}
	url := "http://34.139.202.248:4000/datos"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error al crear la solicitud:", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error al hacer la solicitud:", err)
		return
	}
	defer resp.Body.Close()

	// Verificar el código de estado de la respuesta
	if resp.StatusCode == http.StatusOK {
		fmt.Println("Solicitud POST exitosa")
	} else {
		fmt.Println("Error en la solicitud. Código de estado:", resp.StatusCode)
	}

}

func matarProceso(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var kill Kill
	_ = json.NewDecoder(r.Body).Decode(&kill)
	var message Message
	proceso, err := os.FindProcess(kill.Pid)
	if err != nil {
		message.Message = fmt.Sprintf("Proceso con pid: %d no encontrado", kill.Pid)
		jsonData, err := json.Marshal(message)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Fprintln(w, string(jsonData))
	}

	err = proceso.Signal(syscall.SIGKILL)
	if err != nil {
		log.Fatal(err)
	}

	message.Message = fmt.Sprintf("Proceso con pid: %d eliminado", kill.Pid)

	jsonData, err := json.Marshal(message)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintln(w, string(jsonData))
}

func main() {
	mux := mux.NewRouter()

	mux.HandleFunc("/", mensaje_inicial).Methods("GET")
	mux.HandleFunc("/kill", matarProceso).Methods("POST")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	go func() {
		ticker := time.NewTicker(1 * time.Second)
		ticker2 := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		defer ticker2.Stop()
		for true {
			select {
			case <-ticker.C:
				enviarInfo()
			case <-ticker2.C:
				envio_ip()
			}
		}
	}()

	fmt.Println("Servidor corriendo en el puerto 3000 :D")
	fmt.Println("http://0.0.0.0:3000/")
	log.Fatal(http.ListenAndServe(":3000", handlers.CORS(headers, methods, origins)(mux)))

}
