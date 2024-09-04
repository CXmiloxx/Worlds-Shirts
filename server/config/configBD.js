/* eslint-disable no-undef */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const { MYSQL_ADDON_HOST,MYSQL_ADDON_DB,MYSQL_ADDON_USER, MYSQL_ADDON_PASSWORD } = process.env;

let connection;

export async function createConnection() {
    if (!connection) {
        connection = await mysql.createConnection({
            host : MYSQL_ADDON_HOST,
            user: MYSQL_ADDON_USER,
            password: MYSQL_ADDON_PASSWORD,
            database : MYSQL_ADDON_DB,
        });
        console.log('Conexión exitosa a la base de datos');
    }
    return connection;
}
