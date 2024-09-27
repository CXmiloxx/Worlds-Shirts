import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoginUser.css'
import FiraBaseAuth from '../FiraBase/FiraBaseAuth';
import { dataContext } from '../context/DataContext';

const LoginUser = () => {
    const { login } = useContext(dataContext);
    const URL = import.meta.env.VITE_APP_ENVIROMENT;

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();

        if (!values.email || !values.password) {
            Swal.fire({
                title: 'Por favor completa todos los campos',
                icon: 'error'
            });
            return;
        }

        try {
            const response = await fetch(`${URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                const res = await response.json();
                throw new Error(res.error || 'Error al iniciar sesión');
            }

            const res = await response.json();

            if (res.success) {
                const user = res.user;
                sessionStorage.setItem('email', user.email);
                sessionStorage.setItem('nombres', user.nombres);
                sessionStorage.setItem('apellidos', user.apellidos);
                sessionStorage.setItem('urlImagen', user.urlImagen);
                sessionStorage.setItem('rol', user.rol);

                login(user);

                window.location.hash = user.rol === 'admin' ? '/Adiministrador' : '/iniciada';
            } else {
                Swal.fire({
                    title: res.error,
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: error.message,
                icon: 'error'
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-card-header">
                    <h2 className="login-card-title">INICIAR SESION</h2>
                </div>
                <div className="login-card-body">
                    <form onSubmit={iniciarSesion} className="login-form">
                        <div className="mb-3">
                            <label htmlFor="email" className="login-form-label">
                                CORREO ELECTRONICO
                            </label>
                            <input
                                type="email"
                                className="form-control text-primary"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="login-form-label">
                                CONTRASEÑA
                            </label>
                            <input
                                type="password"
                                className="form-control text-primary"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary">
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/Recuperar" className="login-forgot-password">¿Olvidaste tu contraseña?</Link>
                        </div>
                        <div className="text-center mt-2">
                            <Link to='/Registro' className="login-register-link">Registrate</Link>
                        </div>
                    </form>
                    <div className="text-center m-2">
                        <FiraBaseAuth />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;
