/* eslint-disable no-undef */

const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const moment = require("moment-timezone"); 
const conexion = require("../configDB/configBD");
app.use(cors());

const controller = {
    register: function (req, res) {
        let config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: "https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
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
                rol: req.body.rol,
                fecha_creacion: moment.tz("America/Bogota").format(), // Ajusta la hora a la zona horaria de Colombia
                ciudad: req.body.ciudad,
                departamento: req.body.departamento,
            };

            if (result.data.record.some((x) => x.email === req.body.email)) {
                res.status(400).send("Usuario ya existe");
                return;
            }

            result.data.record.push(usuarioNuevo);

            fetch("https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
                },
                body: JSON.stringify(result.data.record),
            }).then((response) => {
                if (response.status === 200) {
                    res.status(200).send("ok");
                } else {
                    res.status(400).send("No Ok");
                }
            });
        });
    },

    login: async function (req, res) {
        try {
            const config = {
                method: "GET",
                maxBodyLength: Infinity,
                url: "https://api.jsonbin.io/v3/b/6654d659ad19ca34f87015ea",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2a$10$KOXlto6M6yRUPHJtNyxguOIzbIHp4HfSNH0pp09eoC3SxNJjqr9wq",
                },
            };

            const response = await axios(config);
            const users = response.data.record;

            const user = users.find(
                (x) =>
                    x.email === req.body.email &&
                    x.password === req.body.password &&
                    x.rol === req.body.rol
            );

            if (user) {
                return res.status(200).json({
                    nombres: user.nombres,
                    apellidos: user.apellidos,
                    email: user.email,
                });
            } else {
                res.status(400).send("Error");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    registerBD: function(req, res) {
        const { identificacion, nombres, apellidos, email, direccion, telefono, fechaNacimiento, password, rol, departamento, ciudad } = req.body;
        const fechaCreacion = moment.tz("America/Bogota").format(); // Ajusta la hora a la zona horaria de Colombia
        const verificacion = "SELECT * FROM usuarios WHERE identificacion = ? OR email = ?";
        const datosVerificacion = [identificacion, email];
        const query = "INSERT INTO usuarios (identificacion, nombres, apellidos, email, direccion, telefono, fechaNacimiento, contrasena,rol, departamento, municipio, fechaCreacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [identificacion, nombres, apellidos, email, direccion, telefono, fechaNacimiento, password, rol, departamento, ciudad, fechaCreacion];
    
        conexion.query(verificacion, datosVerificacion, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error al verificar usuario" });
            }
            if (result.length > 0) {
                const userExists = result[0];
                const errorType = userExists.email === email ? 'email' : 'identificacion';
                return res.status(400).json({ error: "El usuario ya existe", errorType });
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
    
    loginBD : async function(req, res) {
        const { email, password } = req.body;
        const query = "SELECT * FROM usuarios WHERE email =? AND contrasena =?";
        conexion.query(query, [email, password], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al iniciar sesión");
            }
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.status(400).send("Error");
            }
        });
    },

    usuariosBD: async function(req, res) {
        const query = "SELECT * FROM usuarios WHERE rol = ?";
        const rol = 'usuario';
    
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
            // Enviar solo un JSON con el mensaje de éxito
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        });
    },

    actualizarUsuarioBd: async function (req, res) {
        const { identificacion, nombres, apellidos, email, direccion, telefono } = req.body;
    
        // Validación de entrada
        if (!identificacion || !nombres || !apellidos || !email || !direccion || !telefono) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
    
        const query = `
            UPDATE usuarios 
            SET nombres = ?, apellidos = ?, email = ?, direccion = ?, telefono = ? 
            WHERE identificacion = ?
        `;
        const valores = [nombres, apellidos, email, direccion, telefono, identificacion];
    
        conexion.query(query, valores, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error al actualizar usuario", error: err.message });
            }
            
            // Verifica si se ha actualizado algún registro
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        });
    },
    
    
    recuperarContra : async function(req, res){
        print(req)
        print(res)
    }

};

// eslint-disable-next-line no-undef
module.exports = controller;
