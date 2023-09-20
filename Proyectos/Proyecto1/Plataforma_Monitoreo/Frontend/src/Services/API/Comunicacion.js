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

export const getInfoVM = async (ip) => {
    console.log(ip)
    const { data } = await instance.post(`procesos`, {ip: ip});
    return data;
}
