/* eslint-disable no-undef */
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3715883',
    password: 'by5MEgJ5Jt',
    database: 'sql3715883'
})

connection.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Conexion exitosa')
    }
})

module.exports = connection;