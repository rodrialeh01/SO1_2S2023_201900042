import axios from 'axios';
export const getInicio = (req, res) => {
    const ipAddress = req.header('x-forwarded-for')  || req.socket.remoteAddress;
    res.send({
        message: "Api levantada correctamente",
        ip: ipAddress
    })
}

export const getDatos = async (req, res) => {
    const { data } = await axios.get(`http://localhost:3000/data`);
    res.send(data);
}