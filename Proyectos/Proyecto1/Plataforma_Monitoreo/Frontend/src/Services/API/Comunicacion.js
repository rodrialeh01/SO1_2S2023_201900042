import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'http://localhost:4000/',
        headers:{
            'Content-Type': 'application/json'
        }
    }
);

export const getVMs = async () => {
    const { data } = await instance.get('vms');
    return data;
}
let objeto_retorno = {
    ram: 0,
    cpu: 0,
    procesos: []
}
export const getInfoVM = async (ip) => {
    console.log(ip)
    const { data } = await instance.post(`procesos`, {ip: ip});
    if(data != null){
        objeto_retorno.ram = data.ram
        objeto_retorno.cpu = data.cpu
        objeto_retorno.procesos = data.procesos
    }
    return objeto_retorno;
}
export const killProceso = async (ip, pid) => {
    const { data } = await instance.post(`kill`, {ip: ip, pid: pid});
    return data;
}

export const getHistorial = async (ip) => {
    console.log("desde historial", ip)
    const { data } = await instance.post(`historial`, {ip: ip});
    console.log(data.data)
    return data.data;
}
