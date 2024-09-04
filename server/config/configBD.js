/* eslint-disable no-undef */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

export async function createConnection() {
    if (!connection) {
        const password = process.env.DB_PASSWORD || '' ;
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: password,
            database: process.env.DB_NAME
        });
        console.log('Conexión exitosa a la base de datos');
    }
    return connection;
}
