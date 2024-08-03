import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdLocal'
});

console.log('Conexión exitosa a la base de datos');

export default connection;
