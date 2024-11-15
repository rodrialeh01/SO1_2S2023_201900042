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
    const ipAddress = req.header('x-forwarded-for')  || req.socket.remoteAddress;
    const ipv4Address = ipAddress.split(':').pop();
    objeto = {
        ip: ipv4Address,
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
        const script = `INSERT INTO modulo (ip, cpu, ram, fecha_hora) VALUES ('${ipv4Address}', '${req.body.porcentaje_cpu}', '${req.body.porcentaje_ram}', '${fecha}')`;
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
    const ipAddress = req.header('x-forwarded-for')  || req.socket.remoteAddress;
    const ipv4Address = ipAddress.split(':').pop();
    console.log(ipv4Address)
    setip.add(ipv4Address)
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
        console.log(req.body.ip)
        const script = `SELECT * FROM modulo WHERE ip = '${req.body.ip}' ORDER BY fecha_hora ASC`;
        const [rows, fields] = await db.query(script);
        
        res.send({
            message: "Datos enviados correctamente",
            data: rows
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