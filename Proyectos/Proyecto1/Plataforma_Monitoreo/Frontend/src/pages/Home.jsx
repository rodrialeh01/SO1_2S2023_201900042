import React, { useEffect, useState } from 'react';
import Service from '../Services/Service';
import Navbar from '../components/navbar';

const Home = () => {
  const [maquinasVIrtuales, setMaquinasVirtuales] = useState([]);
  const [maquina_seleccionada, setMaquinaSeleccionada] = useState("");
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
        } else {
          setCantidadRam(0);
          setCantidadCpu(0);
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
              <h2>{cantidadRam}% RAM</h2>
              <div style={{ maxWidth: '300px' }}>
              </div>
            </div>
            <div className="col-md-6">
              <h2>{cantidadCpu}%CPU</h2>
              <p>Este es el contenido de la segunda mitad del div.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
