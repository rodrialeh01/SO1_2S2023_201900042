import React from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiLogoKubernetes } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const stylefont = {
        fontFamily:"'Alata', sans-serif"
    }

    const handleEstatico = () => {
        navigate("/");
    }

    const handleTiempoReal = () => {
        navigate("/tiemporeal");
    }

  return (
    <nav className="flex justify-between px-20 py-7 items-center bg-gray-800">
      <h1 className="text-3xl text-white font-bold flex items-center" style={stylefont}>
        <BiLogoKubernetes className="mr-2 text-5xl text-blue-600" />
        Sistema de Registro de Notas SO1 Proyecto 2
      </h1>
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <li className="font-semibold text-white flex items-center hover:cursor-pointer" style={stylefont} onClick={handleEstatico}> 
            <AiOutlineBarChart className="ml-2 text-2xl" /> Monitoreo Estático
          </li>
          <li className="font-semibold text-white flex items-center hover:cursor-pointer" style={stylefont} onClick={handleTiempoReal}>
            <BsClockHistory className="ml-2 text-3xl p-1"/>Monitoreo a Tiempo Real
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;