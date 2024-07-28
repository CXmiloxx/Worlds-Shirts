import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import Google from '../google/Google';
import UsuarioRegistrado from '../usuarioRegistrado/Usuario';
import './LoginUser.css';

const LoginUser = () => {
    const cookies = new Cookies();
    const [userData, setUserData] = useState(null);
    const URL = import.meta.env.VITE_APP_ENVIROMENT;

    const handleGoogleLogin = (userData) => {
        setUserData(userData);
    };

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

    const iniciarSesion = (e) => {
        e.preventDefault();

        if (!values.email || !values.password) {
            Swal.fire({
                title: 'Por favor completa todos los campos',
                icon: 'error'
            });
            return;
        }

        fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(res => {
                        throw new Error(res.error || 'Error al iniciar sesión');
                    });
                }
                return response.json();
            })
            .then(res => {
                if (res.success) {
                    const user = res.user;
                    cookies.set('email', user.email, { secure: true, sameSite: 'None', path: '/' });
                    cookies.set('nombres', user.nombres, { secure: true, sameSite: 'None', path: '/' });
                    cookies.set('apellidos', user.apellidos, { secure: true, sameSite: 'None', path: '/' });
                    cookies.set('imageUrl', user.imageUrl, { secure: true, sameSite: 'None', path: '/' });
                    cookies.set('rol', user.rol, { secure: true, sameSite: 'None', path: '/' });

                    window.location.hash = user.rol === 'admin' ? '/Adiministrador' : '/iniciada';
                } else {
                    Swal.fire({
                        title: res.error,
                        icon: 'error'
                    });
                }
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
                Swal.fire({
                    title: error.message,
                    icon: 'error'
                });
            });
    };

    useEffect(() => {
        if (cookies.get('email')) {
            window.location.hash = '/Login';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {userData ? (<UsuarioRegistrado />) : (
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
                                <hr />
                                <div className="text-center m-2">
                                    <Google handleGoogleLogin={handleGoogleLogin} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginUser;
