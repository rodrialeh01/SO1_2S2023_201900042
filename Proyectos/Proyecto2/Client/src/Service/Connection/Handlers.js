import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'http://34.148.216.202:5000',
        headers:{
            'Content-Type': 'application/json'
        }
    }
);

export const getData = async () => {
    const { data } = await instance.get('/data');
    return data;
}

export const getAprobacion = async (curso, semestre) => {
    const { data } = await instance.post('/aprobados', {curso, semestre});
    return data;
}

export const getTop3 = async (semestre) => {
    const { data } = await instance.post('/top3', {semestre});
    return data;
}

export const getTop5 = async (semestre) => {
    const { data } = await instance.post('/top5', {semestre});
    return data;
}