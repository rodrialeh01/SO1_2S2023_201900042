import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Service from '../Services/Service';
import Tabla from '../components/Tabla';
import Navbar from '../components/navbar';

const Home = () => {
  ChartJS.register(ArcElement,Tooltip, Legend)
  const [maquinasVIrtuales, setMaquinasVirtuales] = useState([]);
  const [maquina_seleccionada, setMaquinaSeleccionada] = useState("");
  const [procesosvm, setProcesosvm] = useState([]);
  const [cantidadRam, setCantidadRam] = useState(0);
  const [cantidadCpu, setCantidadCpu] = useState(0);



  useEffect(() => {
    const peticionVMs = async () => {
      try {
        const res = await Service.getVMs();
        setMaquinasVirtuales(res.data);
      } catch (error) {
        console.error("Error al obtener las máquinas virtuales:", error);
      }
    };

    const porcentajes = async () => {
      try {
        if (maquina_seleccionada !== "") {
          const res = await Service.getInfoVM(maquina_seleccionada);
          setCantidadRam(res.ram);
          setCantidadCpu(res.cpu);
          setProcesosvm(res.procesos);
        } else {
          setCantidadRam(0);
          setCantidadCpu(0);
          setProcesosvm([]);
        }
      } catch (error) {
        console.error("Error al obtener la información de la máquina virtual:", error);
      }
    };

    peticionVMs();
    porcentajes();

    const interval1 = setInterval(peticionVMs, 1000);
    const interval2 = setInterval(porcentajes, 1000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [maquina_seleccionada]);


  const handleSelectChange = (e) => {
    setMaquinaSeleccionada(e.target.value);
  };

  return (
    <div>
      <Navbar />
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
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col-md-6">
              <h2 className='text-center'>{cantidadRam}% RAM</h2>
              <div style={{ maxWidth: '300px' }}>
                <Pie data={{ labels: ['RAM', 'Libre'], datasets: [{ label: 'RAM', data: [cantidadRam, 100 - cantidadRam], backgroundColor:[ '#e61919', '#007aff'] }] }} />
              </div>
            </div>
            <div className="col-md-6">
              <h2 className='text-center'>{cantidadCpu}%CPU</h2>
              <div style={{ maxWidth: '300px' }}>
                <Pie data={{ labels: ['CPU', 'Libre'], datasets: [{ label: 'CPU', data: [cantidadCpu, 100 - cantidadCpu], backgroundColor: ['#e61919', '#007aff'] }] }} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center'>Procesos</h2>
      </div>
      <div>
        <Tabla procesos={procesosvm} ip={maquina_seleccionada}/>
      </div>
    </div>
    </div>
  );
};

export default Home;
