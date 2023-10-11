import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { getAlbumesIO } from './controllers/data.controllers.js';
import handlerRouter from './routers/data.routers.js';

const app = express();

// Configuración de middlewares
app.use(cors()); // Debe estar antes de las rutas
app.use(express.json());
app.use(morgan('dev'));

// Configuración de Socket.io
const httpServer = app.listen(4000, () => {
    console.log("Server up and running on port 4000!");
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Reemplaza con la URL de tu cliente
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('New connection');
    socket.on('getAlbumes', () => {
        console.log(':)')
        setInterval(()=>{
            getAlbumesIO(socket);
        },500);
    });
});

app.use(handlerRouter);

export default app;
