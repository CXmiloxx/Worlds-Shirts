import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import Google from '../google/Google';
import UsuarioRegistrado from '../usuarioRegistrado/Usuario';
const LoginUser = () => {
    const cookies = new Cookies();
    const [userData, setUserData] = useState(null);
    const URL = import.meta.env.VITE_APP_ENVIROMENT;

    const handleGoogleLogin = (userData) => {
        setUserData(userData);
    };

    const [values, setValues] = useState({
        email: "",
        password: "",
        rol: ""
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

        if (!values.rol) {
            Swal.fire({
                title: "Por favor selecciona un rol",
                icon: "error"
            });
            return;
        }

        if (!values.email || !values.password) {
            Swal.fire({
                title: "Por favor completa todos los campos",
                icon: "error"
            });
            return;
        }

        fetch(`${URL}/login`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(res => {
            if (res.title === "error") {
                Swal.fire({
                    title: "Las credenciales ingresadas no son correctas",
                    icon: "error"
                });
                window.location.hash = '/login';
                return;
            } else {
                cookies.set('email', res.email, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                cookies.set('nombres', res.nombres, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                cookies.set('apellidos', res.apellidos, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                cookies.set('imageUrl', res.imageUrl, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                window.location.hash = (values.rol === "Usuario") ? '/iniciada' : '/usuarios-registrados';
            }
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: "Las credenciales ingresadas no son correctas",
                icon: "error"
            });
        });

    };

    useEffect(() => {
        if (cookies.get('email')) {
            window.location.hash = '/login';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {userData ? (<UsuarioRegistrado /> ) : (
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white">
                                    <div className="card-body p-5 text-center d-flex flex-column justify-content-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Inicio de Sesión</h2>
                                            <p className="text-white-50 mb-4">Por favor ingresa tu correo y contraseña!</p>
                                            <form onSubmit={iniciarSesion}>
                                                <div className="form-outline form-white mb-4">
                                                    <input 
                                                        type="email" 
                                                        id="typeEmailX" 
                                                        className="form-control form-control-lg" 
                                                        name="email" 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <label className="form-label" htmlFor="typeEmailX">Correo</label>
                                                </div>
                                                <div className="form-outline form-white mb-4">
                                                    <input 
                                                        type="password" 
                                                        id="typePasswordX" 
                                                        className="form-control form-control-lg" 
                                                        name="password" 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                                                </div>
                                                <div className="form-outline form-white mb-4">
                                                    <select 
                                                        id="rol" 
                                                        name="rol" 
                                                        className="form-select form-select-lg" 
                                                        onChange={handleChange} 
                                                        required
                                                    >
                                                        <option value="">Selecciona tu rol</option>
                                                        <option value="Usuario">Usuario</option>
                                                        <option value="Administrador">Administrador</option>
                                                    </select>
                                                    <label htmlFor="rol">Rol</label>
                                                </div>
                                                <p className="mb-0">¿Has olvidado tu contraseña?</p>
                                                <Link to="/Recuperar" className="text-blue-50 fw-bold mb-4">Recuperar Contraseña</Link>
                                                <button className="btn btn-outline-light btn-lg px-5" type="submit">Iniciar Sesión</button>
                                            </form>
                                            <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                                <Google handleGoogleLogin={handleGoogleLogin} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-0">¿No tienes una cuenta? <Link to="/registro" className="text-success fw-bold">Regístrate</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default LoginUser;
