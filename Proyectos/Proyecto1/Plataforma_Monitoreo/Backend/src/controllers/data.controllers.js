import axios from 'axios';
import { db } from '../db.js';
export const getInicio = (req, res) => {
    res.send({
        message: "Api levantada correctamente",
    })
}

const setip = new Set();
let objeto = {};
export const obtenerDatos = async (req, res) => {
    console.log("Recibiendo datos")
    console.log(req.body)
    objeto = {
        ip: req.body.ip,
        cpu: req.body.porcentaje_cpu,
        ram: req.body.porcentaje_ram,
        procesos: req.body.procesos
    }
    try{
        const connection = await db.getConnection();
        console.log("Conectado a la base de datos")
        
        const fecha_obtenida = req.body.fecha_hora
        const newFecha = new Date(fecha_obtenida)
        const fecha = newFecha.toISOString().slice(0, 19).replace('T', ' ');
        console.log(fecha)
        const script = `INSERT INTO modulo (ip, cpu, ram, fecha_hora) VALUES ('${req.body.ip}', '${req.body.porcentaje_cpu}', '${req.body.porcentaje_ram}', '${fecha}')`;
        await connection.query(script);
        
        connection.release();
        res.send({
            message: "Datos recibidos correctamente",
            data: req.body
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "Error al recibir los datos"
        })
    }
}

export const obtenerIps = async (req, res) => {
    setip.add(req.body.ip)
    res.send({
        message: "Ips obtenidas correctamente"
    })
}

export const enviarIps = async (req, res) => {
    res.send({
        message: "Ips enviadas correctamente",
        data: Array.from(setip)
    })
}

export const matarProceso = async (req, res) => {
    console.log(req.body.pid)
    const pid = req.body.pid
    console.log(pid)
    try{
        const { data } = await axios.post(`http://${req.body.ip}:3000/kill`, {pid: pid});
        console.log(data)
        res.send({
            message: data.message
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message: "Error al matar el proceso"
        })
    }
}

export const obtenerDatosGraficaTotal = async (req, res) => {
    try{
        const connection = await db.getConnection(); 
        const script = `SELECT * FROM modulo WHERE ip = '${req.body.ip}' ORDER BY fecha_hora ASC`;
        const [data] = await connection.query(script);
        await connection.query(script);
        
        res.send({
            message: "Datos enviados correctamente",
            data: data
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "Error al recibir los datos"
        })
    }
}
let objeto_enviar = {
    cpu: 0,
    ram: 0,
    procesos: []
}
export const obtenerProcesos = async (req, res) => {
    if(objeto){
        if(objeto.ip == req.body.ip){
            objeto_enviar.cpu = objeto.cpu
            objeto_enviar.ram = objeto.ram
            objeto_enviar.procesos = objeto.procesos
            res.send(objeto_enviar)
        }
    }
}