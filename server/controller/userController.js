// /* eslint-disable no-undef */
// // eslint-disable-next-line no-undef
// const fs = require('fs').promises;
// const path = require('path');

// const userFilePath = path.join(__dirname, '../../src/usuariosRegistrados.json');
// const controller = {

//     register: async function (req, res) {
//         try {
//             const {
//                 identificacion,
//                 nombres,
//                 apellidos,
//                 email,
//                 direccion,
//                 telefono,
//                 fechaNacimiento,
//                 password,
//                 departamento,
//                 ciudad
//             } = req.body;

//             const usersData = await fs.readFile(userFilePath, 'utf-8');
//             const users = JSON.parse(usersData);

//             // Verificar si el correo electrónico o la identificación ya están registrados
//             const emailExists = users.some(user => user.email === email);
//             const identificationExists = users.some(user => user.identificacion === identificacion);

//             if (emailExists || identificationExists) {
//                 const errorType = emailExists ? 'email' : 'identification';
//                 res.status(400).json({ errorType });
//                 return;
//             }

//             const newUser = {
//                 id: users.length + 1,
//                 identificacion,
//                 nombres,
//                 apellidos,
//                 email,
//                 direccion,
//                 telefono,
//                 fechaNacimiento,
//                 password,
//                 estado: "activo",
//                 rol: "Usuario",
//                 fecha_creación: new Date(),
//                 departamento,
//                 ciudad
//             };

//             users.push(newUser);

//             // Escribir el archivo JSON
//             await fs.writeFile(userFilePath, JSON.stringify(users, null, 4));

//             res.status(200).send('Usuario creado con éxito');
//         } catch (error) {
//             console.error('Error al procesar el registro:', error);
//             res.status(500).send('Error interno del servidor');
//         }
//     },

//     login: async function (req, res) {
//         try {
//             const usersData = await fs.readFile(userFilePath, 'utf-8');
//             const users = JSON.parse(usersData);

//             for (var x of users) {
//                 if (x.email === req.body.email && x.password === req.body.password && x.rol === req.body.rol) {

//                     return res.status(200).json({
//                         nombres: x.nombres,
//                         apellidos: x.apellidos,
//                         email: x.email
//                     });
//                 }
//             }
//             res.status(400).send('Error');
//         } catch (error) {
//             console.error('Error al procesar el registro:', error);
//             res.status(500).send('Error interno del servidor');
//         }
//     }
// }

// eslint-disable-next-line no-undef
const express =  require("express");
const app = express();
// eslint-disable-next-line no-undef
const axios = require("axios");
// eslint-disable-next-line no-undef
const cors = require("cors");

app.use(cors());

    const controller = {
    register: function (req, res) {
        let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: "https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
            "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
        },
        };
        axios(config).then((result) => {
        let id = result.data.record.length + 1;
        const usuarioNuevo = {
            id: id,
            identificacion: req.body.identificacion,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            email: req.body.email,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            fechaNacimiento: req.body.fechaNacimiento,
            password: req.body.password,
            estado: "activo",
            rol: "Usuario",
            fecha_creación: new Date(),
            departamento : req.body.departamento,
            ciudad : req.body.ciudad,
        };
        if (result.data.record.length === 0) {
            result.data.record.push(usuarioNuevo);
        } else {
            for (let x of result.data.record) {
            if (x.email === req.body.email) {
                res.status(400).send("Usuario ya existe en la Base de Datos");
                return;
            }
            }
            result.data.record.push(usuarioNuevo);
        }

        fetch("https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea", {
            method: "PUT",
            headers: {
            "Content-Type": "Application/json",
            "X-Master-Key":
                "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
            },
            body: JSON.stringify(result.data.record),
        })
            // let configPut = {
            //   method: "PUT",
            //   url: "https://json.extendsclass.com/bin/cd70c6c83bc6",
            //   headers: { "Content-Type": "Application/json", "Security-key": "12345678" },
            //   body: JSON.stringify(result.data),
            // }
            // axios(configPut)
            .then((response) => {
            if (response.status === 200) {
                res.status(200).send("ok");
                return;
            } else {
                res.status(400).send("No Ok");
                return;
            }
            });
        });
    },
    };
    // eslint-disable-next-line no-undef
    module.exports= controller;
