/* eslint-disable no-undef */
import mysql from 'mysql2/promise';

let connection;

export async function createConnection() {
    if (!connection) {
        connection = await mysql.createConnection({
            host : 'bkfaj2n1j7fpijaf13h1-mysql.services.clever-cloud.com',
            user: 'utypeya7dj32gwxg',
            password: 'HuhJUO89sGTxrz2fW5hV',
            database : 'bkfaj2n1j7fpijaf13h1',
        });
        console.log('Conexión exitosa a la base de datos');
    }
    return connection;
}
