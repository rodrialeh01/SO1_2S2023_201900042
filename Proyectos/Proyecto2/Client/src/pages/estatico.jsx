import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useState } from "react";
import { Bar, Pie } from 'react-chartjs-2';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import Tabla from "../components/Tabla";
import './bodypages.css';
const Estatico = () => {
    ChartJS.register(ArcElement,Tooltip, Legend);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    const [aprobacionCurso, setAprobacionCurso] = useState(0);
    const [carneAlumnos, setCarneAlumnos] = useState(['Nombre1','Nombre2','Nombre3']);
    const [cantidadPromedios, setCantidadPromedios] = useState([10,20,30]);
    const [nombreCursos, setNombreCursos] = useState(['Curso1','Curso2','Curso3','Curso4','Curso5']);
    const [cantidadAlumnos, setCantidadAlumnos] = useState([10,20,30,40,50]);

    const stylefont = {
        fontFamily:"'Alata', sans-serif"
    }
    
    return(
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow bg-gray-900">
                <div className="flex justify-center items-center pt-3">
                    <h1 className="text-4xl text-white font-bold" style={stylefont}>Monitoreo Estático con MySQL</h1>
                </div>
                <div className="flex justify-center items-center pt-3 mt-4">
                    <h3 className="text-xl text-white " style={stylefont}>Datos Almacenados:</h3>
                </div>
                <div className="flex pt-4 bg-gray-900">
                    <Tabla />
                </div>
                <div className="flex justify-center items-center pt-3 mt-4">
                    <h3 className="text-xl text-white " style={stylefont}>Porcentaje de Aprobación del Curso</h3>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <select className="px-4 py-2 border border-gray-500 rounded-md mr-2">
                        <option value="opcion1">Curso</option>
                        <option value="opcion2">Opción 2</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-500 rounded-md" >
                        <option value="opcion1">Semestre</option>
                        <option value="opcion2">Opción 2</option>
                    </select>
                    <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-600  text-white">
                        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-blue-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                        <span className="relative text-blue-600 transition duration-300 group-hover:text-white ease">Mostrar</span>
                    </button>
                </div>
                <div className="flex justify-center items-center pt-3 mt-4 max-w-[300px] mx-auto">
                    <Pie 
                        data={{
                            labels: ['Aprobados', 'Reprobados'],
                            datasets: [{
                                label: 'Porcentaje de Aprobación del Curso',
                                data: [aprobacionCurso, 100-aprobacionCurso],
                                backgroundColor: [
                                    'rgb(5, 128, 38)',
                                    'rgb(163, 27, 11)'
                                ],
                                hoverOffset: 4
                            }]
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            }
                        }}
                    />
                </div>
                <div className="columns-2 max-h-full">
                    <div className=" col-span-1">
                        <div className="flex justify-center items-center pt-3 mt-4">
                            <h3 className="text-xl text-white " style={stylefont}>
                                Alumnos con Mejor Promedio
                            </h3>
                        </div>
                        <div className="flex justify-center items-center pt-3 mt-4">
                            <select className="px-4 py-2 border border-gray-500 rounded-md mr-2">
                                <option value="opcion1">Curso</option>
                                <option value="opcion2">Opción 2</option>
                            </select>
                            <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-600  text-white">
                                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-blue-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                <span className="relative text-blue-600 transition duration-300 group-hover:text-white ease">Mostrar</span>
                            </button>
                        </div>
                        <div className="flex justify-center items-center pt-3 mt-4 ">
                            <Bar 
                                data = {{
                                    labels: carneAlumnos,
                                    datasets: [
                                        {
                                            data: cantidadPromedios,
                                            backgroundColor: 'rgba(11, 156, 164,0.2)',
                                            borderColor: 'rgba(11, 156, 163)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options = {{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display:false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                color: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className=" col-span-1">
                        <div className="flex justify-center items-center pt-3 mt-4">
                            <h3 className="text-xl text-white " style={stylefont}>
                                Cursos con Mayor Número de Alumnos
                            </h3>
                        </div>
                        <div className="flex justify-center items-center pt-3 mt-4">
                            <select className="px-4 py-2 border border-gray-500 rounded-md mr-2">
                                <option value="opcion1">Semestre</option>
                                <option value="opcion2">Opción 2</option>
                            </select>
                            <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-600  text-white">
                                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-blue-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                <span className="relative text-blue-600 transition duration-300 group-hover:text-white ease">Mostrar</span>
                            </button>
                        </div>
                        <div className="flex justify-center items-center pt-3 mt-4 ">
                            <Bar 
                                data = {{
                                    labels: nombreCursos,
                                    datasets: [
                                        {
                                            data: cantidadAlumnos,
                                            backgroundColor: 'rgba(82, 12, 169,0.2)',
                                            borderColor: 'rgba(82, 12, 168,1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options = {{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display:false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                color: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Estatico;