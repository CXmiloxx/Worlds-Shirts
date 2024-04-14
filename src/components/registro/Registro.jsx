import { useRef, useState } from 'react';
import './registro.css';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/footer';
import colombiaData from "../colombia.json";

export default function Registro() {
    const [ciudades, setCiudades] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        identificacion: '',
        nombres: '',
        apellidos: '',
        email: '',
        direccion: '',
        telefono: '',
        fechaNacimiento: '',
        password: '',
        passRepeat: ''
    });
    const [errores, setErrores] = useState({
        identificacion: false,
        nombres: false,
        apellidos: false,
        email: false,
        direccion: false,
        telefono: false,
        fechaNacimiento: false,
        password: false,
        passRepeat: false,
        passwordComparacion: false,
    });

    const form = useRef();

    const validPassword = /^(?=.*[A-Z]).{8,}$/;
    const validEmail = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la lógica de envío del formulario
        console.log('Formulario enviado');
    };

    const validateForm = () => {
        const newErrors = {
            identificacion: values.identificacion.length < 5 || values.identificacion.length > 10,
            nombres: values.nombres.length < 3,
            apellidos: values.apellidos.length < 3,
            email: !validEmail.test(values.email),
            direccion: values.direccion.length < 15,
            telefono: values.telefono.length !== 10,
            fechaNacimiento: values.fechaNacimiento === '',
            password: !validPassword.test(values.password),
            passRepeat: values.passRepeat === '' || values.password !== values.passRepeat,
            passwordComparacion: values.password !== values.passRepeat
        };
        setErrores(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const CambioDepartamento = (e) => {
        const departamentoSeleccionado = e.target.value;
        const ciudadesDepartamento = colombiaData.find((item) => item.departamento === departamentoSeleccionado)?.ciudades || [];
        setCiudades(ciudadesDepartamento);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='container'>
            <Header />
            <form onSubmit={handleSubmit} ref={form}>

                <section className="registro-section">

                    <div className="registro-card">
                        <div className="registro-card-body">
                            <h2 className="registro-title">Registro</h2>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="identificacion">Identificación</label>
                                <input type="number" id="identificacion" className={`registro-input ${errores.identificacion && 'error'}`} name='identificacion' placeholder='Deber estar entre 5 y 10 dígitos' onChange={handleChange} onClick={validateForm}/>
                                {errores.identificacion && <p className="error-message">La identificación debe estar entre 5 y diez números</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="nombres">Nombre</label>
                                <input type="text" id="nombres" className={`registro-input ${errores.nombres && 'error'}`} name='nombres' placeholder='Debe ser de mínimo tres caracteres' onChange={handleChange} onClick={validateForm}/>
                                {errores.nombres && <p className="error-message">El nombre debe contener mínimo 3 caracteres</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="apellidos">Apellido</label>
                                <input type="text" id="apellidos" className={`registro-input ${errores.apellidos && 'error'}`} name='apellidos' placeholder='Debe ser de mínimo tres caracteres' onChange={handleChange} onClick={validateForm}/>
                                {errores.apellidos && <p className="error-message">El apellido debe contener mínimo 3 caracteres</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="email">Email</label>
                                <input type="text" id="email" className={`registro-input ${errores.email && 'error'}`} name='email' placeholder='Debe ser un formato válido. Ejemplo: alguien@gmail.com' onChange={handleChange} onClick={validateForm}/>
                                {errores.email && <p className="error-message">El email debe tener la estructura de una dirección de correo electrónico. Verbigracia: alguien@gmail.com</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="direccion">Dirección</label>
                                <input type="text" id="direccion" className={`registro-input ${errores.direccion && 'error'}`} name='direccion' placeholder='Debe ser de mínimo quince caracteres' onChange={handleChange} onClick={validateForm}/>
                                {errores.direccion && <p className="error-message">La dirección debe contener mínimo 15 caracteres</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="telefono">Teléfono</label>
                                <input type="number" id="telefono" className={`registro-input ${errores.telefono && 'error'}`} name='telefono' placeholder='Debe ser de diez números' onChange={handleChange} onClick={validateForm}/>
                                {errores.telefono && <p className="error-message">El teléfono debe ser de 10 números</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                                <input type="date" id="fechaNacimiento" className={`registro-input ${errores.fechaNacimiento && 'error'}`} name='fechaNacimiento' placeholder='Debe ser de diez números' onChange={handleChange} onClick={validateForm}/>
                                {errores.fechaNacimiento && <p className="error-message">Debe introducir una fecha de nacimiento</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="password">Password</label>
                                <input type={showPassword ? "text" : "password"} id="password" className={`registro-input ${errores.password && 'error'}`} name='password' onChange={handleChange} onClick={validateForm}/>
                                {errores.password && <p className="error-message">La contraseña no cumple con los requisitos mínimos solicitados(Mínimo 8 caracteres de longitud. Al menos una letra mayúscula. Al menos una letra minúscula. Al menos un número. Al menos un caracter especial).</p>}
                            </div>

                            <div className="form-group">
                                <label className="registro-label" htmlFor="passRepeat">Repite tu contraseña</label>
                                <input type="password" id="passRepeat" className={`registro-input ${errores.passRepeat && 'error'}`} name='passRepeat' onChange={handleChange} onClick={validateForm}/>
                                {errores.passRepeat && <p className="error-message">Este campo no puede quedar vacío.</p>}
                                {errores.passwordComparacion && <p className="error-message">Las contraseñas ingresadas no coinciden</p>}
                                <button type="button" className="btn-toggle-password" onClick={togglePasswordVisibility}>{showPassword ? "Ocultar" : "Mostrar"}</button>
                            </div>

                            <div className="select-container">
                                <select onChange={CambioDepartamento} className="registro-select">
                                    <option value="">Seleccione un departamento</option>
                                    {colombiaData.map((item) => (
                                        <option key={item.departamento} value={item.departamento}>
                                            {item.departamento}
                                        </option>
                                    ))}
                                </select>

                                <select className="registro-select">
                                    <option value="">Seleccione una ciudad</option>
                                    {ciudades.map((ciudad) => (
                                        <option key={ciudad} value={ciudad}>
                                            {ciudad}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type='submit' className="registro-btn">Registrar</button>
                            </div>

                            <p className="registro-login-link">¿Ya tienes una cuenta? <Link to='/login' className="fw-bold text-body">Inicia sesión aquí</Link></p>

                        </div>
                    </div>

                </section>
            </form>
            <Footer />
        </div>
    )
}
