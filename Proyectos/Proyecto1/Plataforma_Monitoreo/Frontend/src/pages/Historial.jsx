import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import Service from "../Services/Service";
import Navbar from "../components/navbar";
const Historial = () => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend)
    const [maquinasVIrtuales, setMaquinasVirtuales] = useState([]);
    const [maquina_seleccionada, setMaquinaSeleccionada] = useState("");
    const [data_ram, setDataRam] = useState([]);
    const [data_fecha, setDataFecha] = useState([]);
    const [data_cpu, setDataCpu] = useState([]);

    useEffect(() => {
        const peticionVMs = async () => {
            try {
                const res = await Service.getVMs();
                setMaquinasVirtuales(res.data);
            } catch (error) {
                console.error("Error al obtener las máquinas virtuales:", error);
            }
        };
    
        const peticionHistorial = async () => {
            try {
                console.log(maquina_seleccionada);
                if (maquina_seleccionada !== "") {
                    Service.getHistorial(maquina_seleccionada)
                    .then((res) => {
                        const newRam = res.map(({ram})=> ram);
                        const newCpu = res.map(({cpu})=> cpu);
                        const newFecha = res.map(({fecha_hora})=> convertirFormatoFecha(fecha_hora));
                        setDataRam(newRam);
                        setDataCpu(newCpu);
                        setDataFecha(newFecha);
                        console.log(data_ram)
                        console.log(data_cpu)
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            } catch (error) {
                console.error("Error al obtener la información de la máquina virtual:", error);
            }
        };

        peticionVMs();
        peticionHistorial();
        const interval1 = setInterval(peticionVMs, 1000);
        const interval2 = setInterval(peticionHistorial, 1000);
    
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, [maquina_seleccionada]);

    const handleSelectChange = (e) => {
        setMaquinaSeleccionada(e.target.value);
    };

    const convertirFormatoFecha = (fecha) => {
        const fechaObj = new Date(fecha);
        const dia = String(fechaObj.getDate()).padStart(2, '0');
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const anio = fechaObj.getFullYear();
        const horas = String(fechaObj.getHours()).padStart(2, '0');
        const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
        const segundos = String(fechaObj.getSeconds()).padStart(2, '0');
      
        return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
    }

    return(
        <>
        <Navbar/>
        <div>
            <div className="form-floating p-2 mx-auto" style={{ width: "300px" }}>
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" value={maquina_seleccionada} onChange={handleSelectChange}>
                    <option value="">Selecciona una máquina</option>
                    {maquinasVIrtuales.map((maquina, index) => (
                    <option key={index} value={maquina}>
                        Maquina Virtual {index + 1} ({maquina})
                    </option>
                    ))}
                </select>
            </div>
        </div>
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 mb-4">
                        <h1 className='text-center'>Memoria RAM</h1>
                        <Line data={{
                            labels: data_fecha,
                            datasets: [{
                                label: '%RAM',
                                data: data_ram,
                                backgroundColor: 'rgb(86, 158, 41)',
                            }]
                        }}/>
                    </div>
                    <div className="col-sm-12">
                        <h1 className='text-center'>CPU</h1>
                        <Line data={{
                            labels: data_fecha,
                            datasets: [{
                                label: '% CPU',
                                data: data_cpu,
                                backgroundColor: 'rgb(66, 135, 245)',
                            }]
                        }}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Historial;