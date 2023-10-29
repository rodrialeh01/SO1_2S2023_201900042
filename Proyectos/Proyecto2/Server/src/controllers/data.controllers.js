import Redis from 'ioredis';

export const getInicio = async (req, res) => {
    res.send({
        message: 'Bienvenido al Servidor del P2-S01-201900042'
    })
}

export const getNotasIO = async(socket) => {
    const redis = new Redis();
    redis.config('SET', 'notify-keyspace-events', 'KEA');
    let notas = [];
    try{
        let contador = parseInt(await redis.get('contador_notas'));
        if(contador != 0){
            for(let i = 1; i <= contador; i++){
                let nota = await redis.get(`nota_${i}`);
                let notajson = JSON.parse(nota);
                notas.push(notajson);
            }
        }
    }catch(error){
        console.log(error);
    }finally{
        redis.quit();
    }
    socket.emit('notas', notas);
}