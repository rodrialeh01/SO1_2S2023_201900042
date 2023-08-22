import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'http://localhost:3000/',
        timeout: 1000,
        headers: 
        {
            'Content-Type': 'application/json'
        }
    }
);

export const getMusica = async () => {
    const {data} = await instance.get('/biblioteca');
    console.log(data);
    return data;
}

export const nuevaMusica = async (artist, genre, title,year) => {
    console.log(artist, genre, title,year);
    const {data} = await instance.post('/musica', {artist : artist, genre: genre, title: title,year: year});
    console.log(data);
    return data;
}