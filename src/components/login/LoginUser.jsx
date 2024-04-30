import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import "./Login.css"

const LoginUser = () => {
    const cookies = new Cookies();
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

        // Verificar que se haya seleccionado un rol
        if (!values.rol) {
            Swal.fire({
                title: "Por favor selecciona un rol",
                icon: "error"
            });
            return;
        }

        // Verificar que se hayan ingresado el email y la contraseña
        if (!values.email || !values.password) {
            Swal.fire({
                title: "Por favor completa todos los campos",
                icon: "error"
            });
            return;
        }

        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(values)
        })
        fetch("http://localhost:3001/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(values)
})
.then(response => {
    if (response.status === 200) {
        return response.json(); // Convertir la respuesta a JSON
    } else {
        throw new Error('Credenciales incorrectas');
    }
})
.then(data => {
    // Establecer la cookie del email
    cookies.set('email', values.email, {
        secure: true,
        sameSite: 'None',
        path: '/'
    });

    // Establecer la cookie del ID del usuario
    cookies.set('userId', data.userId, {
        secure: true,
        sameSite: 'None',
        path: '/'
    });

    // Redireccionar a la página correspondiente
    window.location.hash = (values.rol === "Usuario") ? '/sesion-iniciada' : '/usuarios-registrados';
})
.catch(error => {
    // Manejar errores
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
    }, []);

    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" >
                                <div className="card-body p-3 text-center d-flex flex-column justify-content-center">
                                    <div className="mb-md-3 mt-md-2 pb-3">
                                        <h2 className="fw-bold mb-2 text-uppercase">Inicio de Sesion </h2>
                                        <p className="text-white-50 mb-3">Por favor ingresa tu correo y contraseña!</p>
                                        <form onSubmit={iniciarSesion}>
                                            <div className="form-outline form-white mb-3">
                                                <input type="email" id="typeEmailX" className="form-control form-control-lg" name="email" onChange={handleChange} />
                                                <label className="form-label" >Correo</label>
                                            </div>
                                            <div className="form-outline form-white mb-3">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg" name="password" onChange={handleChange} />
                                                <label className="form-label" >Contraseña</label>
                                            </div>
                                            <div className='rolUsuario'>
                                                <select id="rol" name="rol" className="form-select form-select-lg" onChange={handleChange}>
                                                    <option value="">Selecccione su rol</option>
                                                    <option value="Usuario">Usuario</option>
                                                    <option value="Administrador">Administrador</option>
                                                </select>
                                                <label htmlFor="rol">Rol</label>
                                            </div>
                                            <p className="small mb-3 pb-lg-1"><a className="text-white-50" href="#!">Olvido su contraseña?</a></p>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Iniciar Sesion</button>
                                        </form>
                                        <div className="d-flex justify-content-center text-center mt-3 pt-1">
                                            <a href="#!" className="text-white"><i className="bi bi-github fa-lg"></i></a>
                                            <a href="#!" className="text-white"><i className="bi bi-facebook fa-lg mx-4 px-2"></i></a>
                                            <a href="#!" className="text-white"><i className="bi bi-google fa-lg"></i></a>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-0">No tienes una cuenta creada? <Link to="/registro" className="text-white-50 fw-bold">Registrate </Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginUser;
