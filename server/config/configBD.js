/* eslint-disable no-undef */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

export async function createConnection() {
    if (!connection) {
        const password = process.env.VITE_APP_DB_PASSWORD || '' ;
        connection = await mysql.createConnection({
            host: process.env.VITE_APP_DB_HOST,
            user: process.env.VITE_APP_DB_USER,
            password: password,
            database: process.env.VITE_APP_DB_NAME,
        });
        console.log('Conexión exitosa a la base de datos');
    }
    return connection;
}
