import mysql from 'mysql2/promise';

let connection;

export async function createConnection() {
    if (!connection) {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'worldShirt'
        });
        console.log('Conexión exitosa a la base de datos');
    }
    return connection;
}
