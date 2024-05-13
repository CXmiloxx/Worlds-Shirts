/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const fs = require('fs').promises;
const path = require('path');

const userFilePath = path.join(__dirname, '../../src/usuariosRegistrados.json');
const controller = {

    register: async function (req, res) {
        try {
            const {
                identificacion,
                nombres,
                apellidos,
                email,
                direccion,
                telefono,
                fechaNacimiento,
                password,
                departamento,
                ciudad
            } = req.body;
    
            const usersData = await fs.readFile(userFilePath, 'utf-8');
            const users = JSON.parse(usersData);
    
            // Verificar si el correo electrónico o la identificación ya están registrados
            const emailExists = users.some(user => user.email === email);
            const identificationExists = users.some(user => user.identificacion === identificacion);
    
            if (emailExists || identificationExists) {
                const errorType = emailExists ? 'email' : 'identification';
                res.status(400).json({ errorType });
                return;
            }
    
            const newUser = {
                id: users.length + 1,
                identificacion,
                nombres,
                apellidos,
                email,
                direccion,
                telefono,
                fechaNacimiento,
                password,
                estado: "activo",
                rol: "Usuario",
                fecha_creación: new Date(),
                departamento,
                ciudad
            };
    
            users.push(newUser);
    
            // Escribir el archivo JSON
            await fs.writeFile(userFilePath, JSON.stringify(users, null, 4));
    
            res.status(200).send('Usuario creado con éxito');
        } catch (error) {
            console.error('Error al procesar el registro:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    login: async function (req, res) {
        try {
            const usersData = await fs.readFile(userFilePath, 'utf-8');
            const users = JSON.parse(usersData);
    
            for (var x of users) {
                if (x.email === req.body.email && x.password === req.body.password && x.rol === req.body.rol) {

                    return res.status(200).json({  
                        nombres: x.nombres, 
                        apellidos: x.apellidos,
                        email: x.email
                    });
                }
            }
            res.status(400).send('Error');
        } catch (error) {
            console.error('Error al procesar el registro:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

module.exports = controller;