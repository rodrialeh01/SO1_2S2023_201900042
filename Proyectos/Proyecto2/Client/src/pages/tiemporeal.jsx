import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import io from 'socket.io-client';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './bodypages.css';
    
const socket = io('http://localhost:5000');
const TiempoReal = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const [cantidadDatos, setCantidadDatos] = useState(0);
    const [cantidadAlumnos, setCantidadAlumnos] = useState([60,70,80,90,100]);
    const [nombreCursos, setNombreCursos] = useState(["SO1","BD1","LFP","SA","AYD1"]);
    const [semestreSeleccionado, setSemestreSeleccionado] = useState('S');
    const [semestre, setSemestre] = useState('S');
    const stylefont = {
        fontFamily:"'Alata', sans-serif"
    }

    useEffect(() => {
        socket.emit('notas_rt')
        socket.on('notas', (data) => {
            console.log(data);
            setCantidadDatos(data.length);
            let contador1 = 0;
            let contador2 = 0;
            let contador3 = 0;
            let contador4 = 0;
            let contador5 = 0;
            console.log('SEMESTRE: ', semestre)
            data.map((nota) => {
                if(semestreSeleccionado === 'S'){
                    if(nota.curso === "SO1"){
                        contador1++;
                    }else if(nota.curso === "BD1"){
                        contador2++;    
                    }else if(nota.curso === "LFP"){
                        contador3++;
                    }else if(nota.curso === "SA"){
                        contador4++;
                    }else if(nota.curso === "AYD1"){
                        contador5++;
                    }
                }else if(semestreSeleccionado === "1S"){
                    if(nota.semestre === "1S"){
                        if(nota.curso === "SO1"){
                            contador1++;
                        }else if(nota.curso === "BD1"){
                            contador2++;    
                        }else if(nota.curso === "LFP"){
                            contador3++;
                        }else if(nota.curso === "SA"){
                            contador4++;
                        }else if(nota.curso === "AYD1"){
                            contador5++;
                        }
                    }
                }else if(semestreSeleccionado === "2S"){
                    if(nota.semestre === "2S"){
                        if(nota.curso === "SO1"){
                            contador1++;
                        }else if(nota.curso === "BD1"){
                            contador2++;    
                        }else if(nota.curso === "LFP"){
                            contador3++;
                        }else if(nota.curso === "SA"){
                            contador4++;
                        }else if(nota.curso === "AYD1"){
                            contador5++;
                        }
                    }
                }
            });
            setCantidadAlumnos([contador1,contador2,contador3,contador4,contador5]);
        });
        
    }, [semestreSeleccionado]);

    const handleSelectChange = (e) => {
        setSemestre(e.target.value);
    };
    const handleButtonClick = (e) => {
        setSemestreSeleccionado(semestre);
    }
    return(
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow bg-gray-900">
                <div className="flex justify-center items-center pt-3">
                    <h1 className="text-4xl text-white font-bold" style={stylefont}>Monitoreo a Tiempo Real con Redis</h1>
                </div>
                <div className="flex justify-center items-center pt-2">
                    <h3 className="text-xl text-white font-semibold " style={stylefont}>Cantidad de datos:{" " + cantidadDatos}</h3>
                </div>
                <div className="flex justify-center items-center pt-5">
                    <h2 className="text-2xl text-white font-semibold " style={stylefont}>Curso vs Cantidad de Alumnos</h2>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <select className="px-4 py-2 border border-gray-500 rounded-md mr-2" onChange={handleSelectChange}>
                        <option value="S">Semestre</option>
                        <option value="1S">Primer Semestre</option>
                        <option value="2S">Segundo Semestre</option>
                    </select>
                    <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600  text-white" onClick={handleButtonClick}>
                        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-red-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                        <span className="relative text-red-600 transition duration-300 group-hover:text-white ease">Filtrar</span>
                    </button>
                </div>
                <div className="flex justify-center items-center pt-3 pb-2 mt-4 " style={{ maxWidth: '80rem' }}>
                    <Bar 
                        data = {{
                            labels: nombreCursos,
                            datasets: [
                                {
                                    data: cantidadAlumnos,
                                    backgroundColor: [
                                        'rgba(11, 156, 164,0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(11, 156, 164)',
                                        'rgba(54, 162, 235)',
                                        'rgba(255, 99, 132)',
                                        'rgba(255, 206, 86)',
                                        'rgba(75, 192, 192)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options = {{
                            indexAxis: 'y',
                            elements: {
                                bar: {
                                    borderWidth: 2,
                                },
                            },
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TiempoReal;