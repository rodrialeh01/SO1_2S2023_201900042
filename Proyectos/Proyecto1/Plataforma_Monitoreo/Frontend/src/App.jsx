import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Historial from "./pages/Historial";
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/historial" element={<Historial/>} />
        <Route path="*" element={<Navigate to="/" replace={true} />} exact={true} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
