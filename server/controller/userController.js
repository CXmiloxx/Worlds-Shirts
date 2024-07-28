    import express from 'express'; 
    const app = express();
    //const axios = require("axios");
    import cors from 'cors';
    import moment from 'moment-timezone';
    import conexion from '../configDB/configBD.js';
    //const nodemailer = require("nodemailer");
    import { Resend } from 'resend';
    app.use(cors());


const resend = new Resend('re_4iUpcS8p_CGQvkhikGNrFcUXteYR6XKbE');

    const controller = {
    // register: function (req, res) {
    //     let config = {
    //         method: "GET",
    //         maxBodyLength: Infinity,
    //         url: "https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "X-Master-Key": "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
    //         },
    //     };

    //     axios(config).then((result) => {
    //         let id = result.data.record.length + 1;
    //         const usuarioNuevo = {
    //             id: id,
    //             identificacion: req.body.identificacion,
    //             nombres: req.body.nombres,
    //             apellidos: req.body.apellidos,
    //             email: req.body.email,
    //             direccion: req.body.direccion,
    //             telefono: req.body.telefono,
    //             fechaNacimiento: req.body.fechaNacimiento,
    //             password: req.body.password,
    //             estado: "activo",
    //             rol: req.body.rol,
    //             fecha_creacion: moment.tz("America/Bogota").format(), // Ajusta la hora a la zona horaria de Colombia
    //             ciudad: req.body.ciudad,
    //             departamento: req.body.departamento,
    //         };

    //         if (result.data.record.some((x) => x.email === req.body.email)) {
    //             res.status(400).send("Usuario ya existe");
    //             return;
    //         }

    //         result.data.record.push(usuarioNuevo);

    //         fetch("https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea", {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "X-Master-Key": "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
    //             },
    //             body: JSON.stringify(result.data.record),
    //         }).then((response) => {
    //             if (response.status === 200) {
    //                 res.status(200).send("ok");
    //             } else {
    //                 res.status(400).send("No Ok");
    //             }
    //         });
    //     });
    // },

    // login: async function (req, res) {
    //     try {
    //         const config = {
    //             method: "GET",
    //             maxBodyLength: Infinity,
    //             url: "https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "X-Master-Key": "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
    //             },
    //         };

    //         const response = await axios(config);
    //         const users = response.data.record;

    //         const user = users.find(
    //             (x) =>
    //                 x.email === req.body.email &&
    //                 x.password === req.body.password &&
    //                 x.rol === req.body.rol
    //         );

    //         if (user) {
    //             return res.status(200).json({
    //                 nombres: user.nombres,
    //                 apellidos: user.apellidos,
    //                 email: user.email,
    //             });
    //         } else {
    //             res.status(400).send("Error");
    //         }
    //     } catch (error) {
    //         console.error("Error al iniciar sesión:", error);
    //         res.status(500).send("Error interno del servidor");
    //     }
    // },

    registerBD: function (req, res) {
        const {
        identificacion,
        nombres,
        apellidos,
        email,
        direccion,
        telefono,
        fechaNacimiento,
        password,
        rol,
        departamento,
        ciudad,
        } = req.body;
        const fechaCreacion = moment.tz("America/Bogota").format(); // Ajusta la hora a la zona horaria de Colombia
        const verificacion =
        "SELECT * FROM usuarios WHERE identificacion = ? OR email = ?";
        const datosVerificacion = [identificacion, email];
        const query =
        "INSERT INTO usuarios (identificacion, nombres, apellidos, email, direccion, telefono, fechaNacimiento, contrasena,rol, departamento, municipio, fechaCreacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
        identificacion,
        nombres,
        apellidos,
        email,
        direccion,
        telefono,
        fechaNacimiento,
        password,
        rol,
        departamento,
        ciudad,
        fechaCreacion,
        ];

        conexion.query(verificacion, datosVerificacion, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al verificar usuario" });
        }
        if (result.length > 0) {
            const userExists = result[0];
            const errorType =
            userExists.email === email ? "email" : "identificacion";
            return res
            .status(400)
            .json({ error: "El usuario ya existe", errorType });
        }

        conexion.query(query, values, (err, result) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al insertar usuario" });
            }
            console.log("Usuario insertado:", result);
            res.status(200).json({ message: "Usuario insertado correctamente" });
        });
        });
    },

    loginBD: async function (req, res) {

        const { email, password } = req.body;
        const query = "SELECT * FROM usuarios WHERE email = ?";
        
        conexion.query(query, [email], (err, result) => {
            if (err) {

                console.error(err);
                return res.status(500).json({ error: "Error al iniciar sesión" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "El correo no está registrado" });
            }
            
            const user = result[0];
            if (user.contrasena !== password) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }
    
            res.status(200).json({
                success: true,
                user: user
            });
        });
    },
    
    

    usuariosBD: async function (req, res) {
        const query = "SELECT * FROM usuarios WHERE rol = ?";
        const rol = "usuario";

        conexion.query(query, [rol], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al obtener usuarios");
        }
        res.send(result);
        });
    },

    eliminarUsuarioBd: async function (req, res) {
        const { identificacion } = req.body;
        const query = "DELETE FROM usuarios WHERE identificacion = ?";

        conexion.query(query, [identificacion], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al eliminar usuario" });
        }
        res.status(200).json({ message: "Usuario eliminado correctamente" });
        });
    },

    actualizarUsuarioBd: async function (req, res) {
        const { identificacion, nombres, apellidos, email, direccion, telefono } =
        req.body;
        if (
        !identificacion ||
        !nombres ||
        !apellidos ||
        !email ||
        !direccion ||
        !telefono
        ) {
        return res
            .status(400)
            .json({ message: "Todos los campos son obligatorios" });
        }

        const query = `
                UPDATE usuarios 
                SET nombres = ?, apellidos = ?, email = ?, direccion = ?, telefono = ? 
                WHERE identificacion = ?
            `;
        const valores = [
        nombres,
        apellidos,
        email,
        direccion,
        telefono,
        identificacion,
        ];

        conexion.query(query, valores, (err, result) => {
        if (err) {
            console.error(err);
            return res
            .status(500)
            .json({ message: "Error al actualizar usuario", error: err.message });
        }

        // Verifica si se ha actualizado algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado correctamente" });
        });
    },

    recuperarContra: async function (req, res) {
        const { email, contrasena } = req.body;
        const query = "SELECT * FROM usuarios WHERE email = ?";
    
        conexion.query(query, [email], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error al recuperar contraseña", error: err.message });
            }
    
            if (result.length === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            const updateQuery = `
                UPDATE usuarios
                SET contrasena = ?
                WHERE email = ?
            `;
    
            conexion.query(updateQuery, [contrasena, email], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error al actualizar contraseña", error: err.message });
                }
    
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
    
                try {
                    await resend.emails.send({
                        from: 'onboarding@resend.dev',
                        to: email,
                        subject: 'Recuperar Contraseña',
                        html: `
                            <!DOCTYPE html>
                            <html lang="es">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Nueva Contraseña</title>
                            </head>
                            <body>
                                <h1>Hola</h1>
                                <h3>${email}</h3>
                                <p>Tu nueva contraseña es: <strong>${contrasena}</strong></p>
                                <p>Recuerda siempre tu contraseña </p>
                                <p>Saludos,</p>
                                <p>Equipo de Soporte</p>
                                <p><a href="https://ligamerch.onrender.com/#/Login">Ir al sitio web</a></p>
                            </body>
                            </html>
                        `
                    });
                    res.status(200).json({ message: "Contraseña actualizada y correo enviado correctamente", success: true });
                } catch (error) {
                    console.error("Error al enviar el correo:", error);
                    res.status(500).json({ message: "Error al enviar el correo", error: error.message });
                }
            });
        });
    }
    
    };

    // eslint-disable-next-line no-undef
    export default controller;
