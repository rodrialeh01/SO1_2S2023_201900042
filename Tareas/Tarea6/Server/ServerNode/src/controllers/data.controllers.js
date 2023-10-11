import Redis from 'ioredis';

export const getInicio = async (req, res) => {
    res.send({
        message: 'Bienvenido a la API de la tarea 6'
    })
}

export const getAlbumes = async (req, res) => {
    const redis = new Redis();
    let albumes = [];
    try{
        let contador = parseInt(await redis.get('contador_album'));
        if(contador != 0){
            for(let i = 1; i <= contador; i++){
                let album = await redis.get(`album${i}`);
                let albumjson = JSON.parse(album);
                albumes.push(albumjson);
            }
        }
    }catch(error){
        console.log(error);
    }finally{
        redis.quit();
    }
    res.send(albumes)
}

export const getAlbumesIO = async(socket) => {
    const redis = new Redis();
    redis.config('SET', 'notify-keyspace-events', 'KEA');
    let albumes = [];
    try{
        let contador = parseInt(await redis.get('contador_album'));
        if(contador != 0){
            for(let i = 1; i <= contador; i++){
                let album = await redis.get(`album${i}`);
                let albumjson = JSON.parse(album);
                albumes.push(albumjson);
            }
        }
    }catch(error){
        console.log(error);
    }finally{
        redis.quit();
    }
    socket.emit('albumes', albumes);
}