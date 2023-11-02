import { config } from 'dotenv';
import { createPool } from 'mysql2/promise';
config();

export const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT,
});