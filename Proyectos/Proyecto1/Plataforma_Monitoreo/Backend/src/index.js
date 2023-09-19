import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import handlerRouter from './routers/data.routers.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(handlerRouter)

app.listen(4000);

console.log("Server up and running on port 4000!")