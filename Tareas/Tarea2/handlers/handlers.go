package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type data struct {
	Carnet int    `json:"carnet"`
	Nombre string `json:"nombre"`
}

func GetData(rw http.ResponseWriter, r *http.Request) {
	rodri := data{Carnet: 201900042, Nombre: "Rodrigo Alejandro Hernández de León"}
	output, _ := json.Marshal(rodri)
	fmt.Fprintln(rw, string(output))
}
