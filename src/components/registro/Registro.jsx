import { useRef, useState } from "react";
import Swal from "sweetalert2";
import "./registro.css";
import colombia from "../colombia.json";
import { Link } from "react-router-dom";
import Header from "../nav/Nav";
import Foot from "../footer/Foot";

export default function Registro() {
    const form = useRef();
    const URL = import.meta.env.VITE_APP_ENVIROMENT;
    const [values, setValues] = useState({
        identificacion: "",
        nombres: "",
        apellidos: "",
        email: "",
        direccion: "",
        telefono: "",
        fechaNacimiento: "",
        password: "",
        passRepeat: "",
        departamento: "",
        ciudad: "",
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        const validations = [
            { field: "identificacion", min: 5, max: 10, message: "La identificación debe estar entre 5 y 10 dígitos" },
            { field: "nombres", min: 3, message: "El nombre debe contener mínimo 3 caracteres" },
            { field: "apellidos", min: 3, message: "El apellido debe contener mínimo 3 caracteres" },
            { field: "email", validator: validateEmail, message: "Debe introducir una dirección de correo electrónico válida" },
            { field: "direccion", min: 15, message: "La dirección debe contener mínimo 15 caracteres" },
            { field: "telefono", min: 10, max: 10, message: "El teléfono debe ser de 10 números" },
            { field: "fechaNacimiento", validator: value => value !== "", message: "Debe introducir una fecha de nacimiento" },
            { field: "password", validator: validatePassword, message: "La contraseña no cumple con los requisitos mínimos" },
            { field: "passRepeat", validator: value => value !== "", message: "Este campo no puede quedar vacío" },
            { field: "password", validator: (value) => value === values.passRepeat, message: "Las contraseñas ingresadas no coinciden" }
        ];

        for (const { field, min, max, validator, message } of validations) {
            const value = values[field];
            if ((min && value.length < min) || (max && value.length > max) || (validator && !validator(value))) {
                Swal.fire({ title: message, icon: "error" });
                return;
            }
        }

        // // Envío de datos al servidor
        // fetch("http://localhost:3001/registro-usuario", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Accept: "application/json",
        //     },
        //     body: JSON.stringify(values),
        // })
        fetch(`${URL}/registro-usuario`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if (response.status === 200) {
                Swal.fire({ title: "Usuario creado con éxito", icon: "success" });
                form.current.reset();
                
                window.location.hash = "/login";
            } else if (response.status === 400) {
                response.json().then(data => {
                    const errorType = data.errorType === 'email' ? `el correo ${values.email}` : `la identificación ${values.identificacion}`;
                    Swal.fire({ title: `No fue posible crear el usuario porque ${errorType} ya está registrado`, icon: "warning" });
                });
            }
        })
        .catch(() => {
            Swal.fire({ title: "No fue posible finalizar el proceso de registro por un error interno del servidor", icon: "error" });
        });
    };

    const validateEmail = (email) => /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email);
    
    const validatePassword = (password) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    return (
        <div className="container">
            <Header />
            <form onSubmit={handleSubmit} ref={form}>
                <section className="vh-100 bg-image">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Registro</h2>

                                    <div className="row">
                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example1cg">
                                                <strong>Identificación</strong>
                                            </label>
                                            <input
                                                type="number"
                                                id="form3Example0cg"
                                                className="form-control"
                                                name="identificacion"
                                                placeholder="Deber estar entre 5 y 10 dígitos"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example1cg">
                                                <strong>Nombre</strong>
                                            </label>
                                            <input
                                                type="text"
                                                id="form3Example1cg"
                                                className="form-control"
                                                name="nombres"
                                                placeholder="Debe ser de mínimo tres caracteres"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example1cg">
                                                <strong>Apellido</strong>
                                            </label>
                                            <input
                                                type="text"
                                                id="form3Example2cg"
                                                className="form-control form-control-lg"
                                                name="apellidos"
                                                placeholder="Debe ser de mínimo tres caracteres"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example3cg">
                                                <strong>Email</strong>
                                            </label>
                                            <input
                                                type="text"
                                                id="form3Example3cg"
                                                className="form-control form-control-lg"
                                                name="email"
                                                placeholder="Debe ser un formato válido. Ejemplo: alguien@gmail.com"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example3cg">
                                                <strong>Dirección</strong>
                                            </label>
                                            <input
                                                type="text"
                                                id="form3Example4cg"
                                                className="form-control form-control-lg"
                                                name="direccion"
                                                placeholder="Debe ser de mínimo quince caracteres"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example3cg">
                                                <strong>Teléfono</strong>
                                            </label>
                                            <input
                                                type="number"
                                                id="form3Example5cg"
                                                className="form-control form-control-lg"
                                                name="telefono"
                                                placeholder="Debe ser de diez números"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3cg">
                                            <strong>Fecha de nacimiento</strong>
                                        </label>
                                        <input
                                            type="date"
                                            id="form3Example6cg"
                                            className="form-control form-control-lg"
                                            name="fechaNacimiento"
                                            placeholder="Debe ser de diez números"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example3cg">
                                                <strong>Departamento residencia</strong>
                                            </label>
                                            <br></br>
                                            <select name="departamento" onChange={handleChange} className="departamento">
                                                <option>Seleccione:</option>
                                                {colombia.map((depto, index) => (
                                                    <option key={index} value={depto.departamento}>
                                                        {depto.departamento}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-outline mb-4 col-6">
                                            <label className="form-label" htmlFor="form3Example3cg">
                                                <strong>Ciudad o municipio Residencia</strong>
                                            </label>
                                            <br></br>
                                            <select name="ciudad" onChange={handleChange} className="ciudades">
                                                <option>Seleccione:</option>
                                                {values.departamento &&
                                                    colombia.find((depto) => depto.departamento === values.departamento).ciudades.map((ciudad, index) => (
                                                        <option key={index} value={ciudad}>
                                                            {ciudad}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example4cg">
                                            <strong>Contraseña</strong>
                                        </label>
                                        <input
                                            type="password"id="form3Example7cg"className="form-control form-control-lg"name="password"
                                            placeholder="Ingrese password"onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example4cdg">
                                            <strong>Repeta la  Contraseña</strong>
                                        </label>
                                        <input
                                            type="password"
                                            id="form3Example8cdg"
                                            className="form-control form-control-lg"
                                            name="passRepeat"
                                            placeholder="Reingrese password"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                    </div>

                                    <p className="text-center text-muted mt-5 mb-0">
                                        Ya tienes una cuenta creada ? {" "}
                                        <Link to="/login" className="fw-bold text-body">Iniciar sesión</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <Foot/>
        </div>
    );
}
