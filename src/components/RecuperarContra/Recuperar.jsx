import { useState } from "react";
import { Link } from "react-router-dom";
import './Recuperar.css';
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_APP_ENVIROMENT;

export default function Recuperar() {
    const [email, setEmail] = useState("");

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        const nuevaContrasena = generarContrasenaAleatoria();
    
        fetch(`${URL}/recuperarContra`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                contrasena: nuevaContrasena
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({ title: data.message, icon: "success" });
            } else {
                Swal.fire({ title: "Error", text: data.message, icon: "error" });
            }
        })
        .catch(error => {
            Swal.fire({ title: "Error", text: error.message, icon: "error" });
        });
    };

    const validatePassword = (password) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    const generarContrasenaAleatoria = () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?!@$%^&*-';
        let contrasena;
        do {
            contrasena = '';
            for (let i = 0; i < 12; i++) {
                contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
        } while (!validatePassword(contrasena));
        return contrasena;
    };

    return (
        <div className="recuperar-container">
            <section className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border-0 rounded-3 shadow-sm">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <Link to='/'>
                                            <img src='icono_champions.jpeg' alt="Logo" width="175" height="57" className="img-fluid"/>
                                        </Link>
                                    </div>
                                    <h2 className="text-center">Recuperar Contraseña</h2>
                                    <p className="text-center text-muted mb-4">Ingresa tu correo para recuperar tu contraseña.</p>
                                    <form onSubmit={manejarEnvio}>
                                        <div className="form-floating">
                                            <input
                                                type="email" 
                                                className="form-control text-light" 
                                                name="email"
                                                id="email"
                                                placeholder="name@example.com" 
                                                required 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label htmlFor="email">Correo</label>
                                        </div>
                                        <div className="d-grid my-3">
                                            <button className="btn btn-primary btn-lg" type="submit">
                                                <i className="fas fa-key me-2"></i>Recuperar Contraseña
                                            </button>
                                        </div>
                                        <div className="d-flex gap-2 justify-content-between">
                                            <Link to='/Login' className="btn-login">Iniciar Sesión</Link>
                                            <Link to='/Registro' className="btn-registro">Crear una Cuenta</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
