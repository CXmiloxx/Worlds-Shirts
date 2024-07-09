/* eslint-disable no-undef */
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'BdLocal'
})

connection.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Conexion exitosa a la base de datos')
    }
})

module.exports = connection;