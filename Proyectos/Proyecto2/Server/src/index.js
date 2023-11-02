import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { getNotasIO } from './controllers/data.controllers.js';
import handlerRouter from './routers/data.routers.js';

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

const httpServer = app.listen(5000, () => {
    console.log("Server up and running on port 5000!");
});

const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New connection');
    socket.on('notas_rt', () => {
        setInterval(() => {
            getNotasIO(socket);
        },1000);
    });
});

app.use(handlerRouter)

export default app;