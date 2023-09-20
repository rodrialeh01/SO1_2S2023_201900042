import React from "react";
import { Link } from "react-router-dom";
const Navbar = (props) => {
    return(
        <>
        <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                <div>
                    <h1 className="navbar-brand fs-3">Sistemas Operativos 1</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center w-100">
                    <a className="navbar-brand fs-2"><img width="48" height="48" src="https://img.icons8.com/color/48/smartphone-cpu.png" alt="smartphone-cpu"/>Plataforma de Monitoreo GCP - Proyecto 1</a>
                </div>
                <div className="collapse navbar-collapse na" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                    <Link className="nav-link white-space-nowrap" aria-current="page" to="/">Tiempo Real</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/historial">Historial</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;