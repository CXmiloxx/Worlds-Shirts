/* eslint-disable no-undef */
const express = require("express");
const app = express();
const axios = require("axios");
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
                fecha_creacion: new Date(),
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
};

// eslint-disable-next-line no-undef
module.exports = controller;
