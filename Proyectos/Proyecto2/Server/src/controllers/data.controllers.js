import Redis from 'ioredis';
import { db } from '../bd.js';

export const getInicio = async (req, res) => {
    res.send({
        message: 'Bienvenido al Servidor del P2-S01-201900042'
    })
}

export const getData = async(req, res) => {
    try{
        const [rows, fields] = await db.query('SELECT * FROM alumno');
        console.log(rows);
        res.json(rows);
    }catch(error){
        console.log(error);
    }
}

export const getAprobacion = async(req, res) => {
    const curso = req.body.curso;
    const semestre = req.body.semestre;
    try{
        const query = `
        SELECT
            COUNT(*) AS cantidad,
            COUNT(IF(nota >= 61, 1, NULL)) AS aprobados,
            COUNT(IF(nota < 61, 1, NULL)) AS reprobados
        FROM
            sistemanotas.alumno
        WHERE
            curso = "${curso}"
            AND semestre = "${semestre}";
        `;
        const [rows, fields] = await db.query(query);
        console.log(rows[0]);
        res.json(rows[0]);
    }catch(error){
        console.log(error);
    }
}

export const getTop3 = async(req, res) => {
    const semestre = req.body.semestre;
    try{
        const query = `
        SELECT
            COUNT(*) AS cantidad,
            curso
        FROM
            sistemanotas.alumno
        WHERE
            semestre = "${semestre}"
        GROUP BY
            curso
        ORDER BY
            cantidad DESC
        LIMIT 3;
        `;
        const [rows, fields] = await db.query(query);
        console.log(rows);
        res.json(rows);
    }catch(error){
        console.log(error);
    }
}

export const getTopPromedios = async(req, res) => {
    const semestre = req.body.semestre;
    try{
        const query = `
        SELECT
            carnet,
            nombre,
            AVG(nota) AS promedio
        FROM
            sistemanotas.alumno
        WHERE
            semestre = "${semestre}"
        GROUP BY
            carnet, nombre
        ORDER BY promedio DESC
        LIMIT 5;
        `
        const [rows, fields] = await db.query(query);
        console.log(rows);
        res.json(rows);
    }catch(error){
        console.log(error);
    }
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
