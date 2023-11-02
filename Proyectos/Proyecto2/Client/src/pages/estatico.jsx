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
import toast, { Toaster } from 'react-hot-toast';
import Service from '../Service/Service';
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
    const [cursoSeleccionado1, setCursoSeleccionado1] = useState('Ninguno');
    const [semestreSeleccionado1, setSemestreSeleccionado1] = useState('Ninguno');
    const [semestreSeleccionado2, setSemestreSeleccionado2] = useState('Ninguno');
    const [semestreSeleccionado3, setSemestreSeleccionado3] = useState('Ninguno');
    const [carneAlumnos, setCarneAlumnos] = useState(['','','', '', '']);
    const [cantidadPromedios, setCantidadPromedios] = useState([0,0,0,0,0]);
    const [nombreCursos, setNombreCursos] = useState(['','','']);
    const [cantidadAlumnos, setCantidadAlumnos] = useState([0,0,0]);
    const [cantidadAprobados, setCantidadAprobados] = useState(0);
    const [cantidadReprobados, setCantidadReprobados] = useState(0);

    const stylefont = {
        fontFamily:"'Alata', sans-serif"
    }

    const handleSelect1 = (e) => {
        setCursoSeleccionado1(e.target.value);
    }

    const handleSelect2 = (e) => {
        setSemestreSeleccionado1(e.target.value);
    }

    const handleSelect3 = (e) => {
        setSemestreSeleccionado2(e.target.value);
    }

    const handleSelect4 = (e) => {
        setSemestreSeleccionado3(e.target.value);
    }

    const Filtro1 = () => {
        if(cursoSeleccionado1 === 'Ninguno' || semestreSeleccionado1 === 'Ninguno'){
            setAprobacionCurso(0);
            toast.error('Selecciona un curso y un semestre obligatoriamente',
                {
                    icon: '❌',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
            );
            return;
        }
        Service.getAprobacion(cursoSeleccionado1, semestreSeleccionado1)
        .then((res) => {
            console.log(res);
            const total = res.cantidad;
            const ap = res.aprobados;
            const re = res.reprobados;
            setCantidadAprobados(ap);
            setCantidadReprobados(re);
            if(total === 0){
                setAprobacionCurso(0);
            }else{
                setAprobacionCurso((ap/total)*100);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const Filtro2 = () => {
        if(semestreSeleccionado2 === 'Ninguno'){
            toast.error('Selecciona un semestre obligatoriamente',
                {
                    icon: '❌',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
            );
            setCarneAlumnos(['','','', '', '']);
            setCantidadPromedios([0,0,0,0,0]);
            return;
        }
        Service.getTop5(semestreSeleccionado2)
        .then((res) => {
            console.log(res);
            let datos = [];
            let cantidades = [];
            res.forEach(element => {
                datos.push(element.carnet);
                cantidades.push(element.promedio);
            });
            setCarneAlumnos(datos);
            setCantidadPromedios(cantidades);
        })
    }

    const Filtro3 = () => {
        if(semestreSeleccionado3 === 'Ninguno'){
            toast.error('Selecciona un semestre obligatoriamente',
                {
                    icon: '❌',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
            );
            setNombreCursos(['','','']);
            setCantidadAlumnos([0,0,0]);
            return;
        }
        Service.getTop3(semestreSeleccionado3)
        .then((res) => {
            console.log(res);
            let nombres = [];
            let cantidades = [];
            res.forEach(element => {
                if(element.curso ==='SO1'){
                    nombres.push('Sistemas Operativos 1');
                }else if(element.curso ==='BD1'){
                    nombres.push('Sistemas de Bases de Datos 1');
                }else if(element.curso ==='LFP'){
                    nombres.push('Lenguajes Formales y de Programación');
                }else if(element.curso ==='SA'){
                    nombres.push('Software Avanzado');
                }else if(element.curso ==='AYD1'){
                    nombres.push('Analisis y Diseño 1');
                }
                cantidades.push(element.cantidad);
            });
            setNombreCursos(nombres);
            setCantidadAlumnos(cantidades);
        })
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
                <div className="flex justify-center items-center pt-3 mt-4 columns-2">
                    <div>
                        <h3 className="text-xl text-white col-span-1 mr-3" style={stylefont}>Aprobados:{cantidadAprobados}</h3>
                    </div>
                    <div>
                        <h3 className="text-xl text-white col-span-1 mr-3" style={stylefont}>Reprobados:{cantidadReprobados}</h3>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <select className="px-4 py-2 border border-gray-500 rounded-md mr-2" onChange={handleSelect1}>
                        <option value="Ninguno">Curso</option>
                        <option value="SO1">Sistemas Operativos 1</option>
                        <option value="BD1">Sistemas de Bases de Datos 1</option>
                        <option value="LFP">Lenguajes Formales y de Programación</option>
                        <option value="SA">Software Avanzado</option>
                        <option value="AYD1">Analisis y Diseño 1</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-500 rounded-md" onChange={handleSelect2}>
                        <option value="Ninguno">Semestre</option>
                        <option value="1S">Primer Semestre</option>
                        <option value="2S">Segundo Semestre</option>
                    </select>
                    <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-600  text-white" onClick={Filtro1}>
                        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-blue-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                        <span className="relative text-blue-600 transition duration-300 group-hover:text-white ease">Mostrar</span>
                    </button>
                </div>
                <div className="flex justify-center items-center pt-3 mt-4 max-w-[300px] mx-auto">
                    <Pie 
                        data={{
                            labels: ['Aprobados', 'Reprobados'],
                            datasets: [{
                                label: 'Porcentaje',
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
                        <select className="px-4 py-2 border border-gray-500 rounded-md" onChange={handleSelect3}>
                            <option value="Ninguno">Semestre</option>
                            <option value="1S">Primer Semestre</option>
                            <option value="2S">Segundo Semestre</option>
                        </select>
                            <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-600  text-white" onClick={Filtro2}>
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
                            <select className="px-4 py-2 border border-gray-500 rounded-md mr-2" onChange={handleSelect4}>
                                <option value="Ninguno">Semestre</option>
                                <option value="1S">Primer Semestre</option>
                                <option value="2S">Segundo Semestre</option>
                            </select>
                            <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-600  text-white" onClick={Filtro3}>
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
            <Toaster />
        </div>
    )
}

export default Estatico;