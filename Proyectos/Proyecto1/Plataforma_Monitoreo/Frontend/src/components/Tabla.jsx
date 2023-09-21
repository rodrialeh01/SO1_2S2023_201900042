import React, { useState } from "react";
import Service from "../Services/Service";

const Tabla = ({procesos, ip}) => {

    const [search, setSearch] = useState("");

    const buscador = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
        
    }

    let results = []
    if(!search){
        results = procesos;
    }else{
        results = procesos.filter( (info) =>
            info.pid === parseInt(search)
        )
    }

    const handleKill = (pid) => {
        Service.killProceso(ip,pid)
        .then((res) => {
            alert(res);
        })
        .catch((err) => {
            console.log(err);
            alert("No se pudo eliminar el proceso");
        })
    }

    return (
        <div>
            <div class="input-group mb-3 p-2 mx-auto" style={{ width: "600px", height:'60px' }}>
                <span class="input-group-text">PID</span>
                <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" placeholder="PID" value={search} onChange={buscador}/>
            </div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">PID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Estado</th>
                    <th scope="col">% RAM</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((proceso) => (
                        <tr key={proceso.pid}>
                            <td scope="row">{proceso.pid}</td>
                            <td>{proceso.nombre}</td>
                            <td>{proceso.usuario}</td>
                            <td>{proceso.estado}</td>
                            <td>{proceso.porcentaje_ram}</td>
                            <td><button type="button" class="btn btn-danger" onClick={() => handleKill(proceso.pid)}>Kill</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tabla;