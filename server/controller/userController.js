import { uploader } from '../config/cloudinaryConfig.js';
import express from 'express';
import cors from 'cors';
import { createConnection } from '../config/configBD.js';
import moment from 'moment-timezone';
import { Resend } from 'resend';

const app = express();
app.use(cors());

const resend = new Resend('re_4iUpcS8p_CGQvkhikGNrFcUXteYR6XKbE');

const connection = await createConnection();


export const registerBD = async (req, res) => {
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
        estado,
        departamento,
        ciudad,
    } = req.body;
    const file = req.file;
    const fechaCreacion = moment.tz("America/Bogota").format(); // Ajusta la hora a la zona horaria de Colombia

    try {
        
        // Verificación de usuario existente
        const verificacion = "SELECT * FROM usuarios WHERE identificacion = ? OR email = ?";
        const datosVerificacion = [identificacion, email];
        const [existingUser] = await connection.query(verificacion, datosVerificacion);

        if (existingUser.length > 0) {
            const userExists = existingUser[0];
            const errorType = userExists.email === email ? "email" : "identificacion";
            return res.status(400).json({ error: "El usuario ya existe", errorType });
        }

        // Subir imagen a Cloudinary
        const result = await new Promise((resolve, reject) => {
            uploader.upload_stream({ folder: "usuarios" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(file.buffer);
        });

        const urlImagen = result.secure_url;

        const query = "INSERT INTO usuarios (identificacion, nombres, apellidos, email, direccion, telefono, fechaNacimiento, contrasena, rol, estado, departamento, municipio, fechaCreacion, urlImagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
            estado,
            departamento,
            ciudad,
            fechaCreacion,
            urlImagen
        ];

        await connection.query(query, values);
        res.status(200).json({ message: "Usuario insertado correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

export const loginBd = async (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM usuarios WHERE email = ?";

    try {
        const [result] = await connection.query(query, [email]);

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
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};


export const usuariosBD = async (req, res) => {
    const query = "SELECT * FROM usuarios WHERE rol = ?";
    const rol = "usuario";

    try {
        const [result] = await connection.query(query, [rol]);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener usuarios");
    }
};


export const eliminarUsuarioBd = async (req, res) => {
    const { identificacion } = req.body;
    const query = "DELETE FROM usuarios WHERE identificacion = ?";

    try {
        await connection.query(query, [identificacion]);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};


export const actualizarUsuarioBd = async (req, res) => {
    const { identificacion, nombres, apellidos, email, direccion, telefono } = req.body;

    if (!identificacion || !nombres || !apellidos || !email || !direccion || !telefono) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const query = `
        UPDATE usuarios 
        SET nombres = ?, apellidos = ?, email = ?, direccion = ?, telefono = ? 
        WHERE identificacion = ?
    `;
    const valores = [nombres, apellidos, email, direccion, telefono, identificacion];

    try {
        const [result] = await connection.query(query, valores);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al actualizar usuario", error: err.message });
    }
};


export const recuperarContra = async (req, res) => {
    const { email, contrasena } = req.body;
    const query = "SELECT * FROM usuarios WHERE email = ?";

    try {
        const [result] = await connection.query(query, [email]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const updateQuery = "UPDATE usuarios SET contrasena = ? WHERE email = ?";
        const [updateResult] = await connection.query(updateQuery, [contrasena, email]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Recuperar Contraseña',
            html: `
                    <h1>Hola</h1>
                    <p>Tu nueva contraseña es: <strong>${contrasena}</strong></p>
                    <p>Recuerda siempre tu contraseña </p>
                    <p>Saludos,</p>
                    <p>Equipo de Soporte</p>
                    <p><a href="https://ligamerch.onrender.com/#/Login">Ir al sitio web</a></p>
            `
        });

        res.status(200).json({ message: "Contraseña actualizada y correo enviado correctamente", success: true });
    } catch (err) {
        console.error("Error al enviar el correo:", err);
        res.status(500).json({ message: "Error al enviar el correo", error: err.message });
    }
};

