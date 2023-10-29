import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './bodypages.css';

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
    const stylefont = {
        fontFamily:"'Alata', sans-serif"
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
                    <select className="px-4 py-2 border border-gray-500 rounded-md mr-2">
                        <option value="opcion1">Semestre</option>
                        <option value="opcion2">Opción 2</option>
                    </select>
                    <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600  text-white">
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