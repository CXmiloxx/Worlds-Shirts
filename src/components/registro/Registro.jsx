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
        rol: "usuario",
        estado: "activo",
        passRepeat: "",
        departamento: "",
        ciudad: "",
    });
    const [imagen, setImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);

            // Crear una URL de vista previa
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagenPreview(null);
        }
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
            { field: "fechaNacimiento", validator: validateAge, message: "Debes de tener minimo 12 años" },
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

        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });
        if (imagen) {
            formData.append("imagen", imagen);
        }

        fetch(`${URL}/register`, {
            method: "POST",
            body: formData,
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

    const validateAge = (fechaNacimiento) => {
        const birthDate = new Date(fechaNacimiento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 12;
    };

    return (
        <div className="container">
            <Header />
            <form onSubmit={handleSubmit} ref={form}>
                <section className="registro-section">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-10">
                                <div className="registro-card">
                                    <div className="registro-card-body">
                                        <h2 className="text-uppercase text-center mb-5">Registro</h2>

                                        <div className="row">
                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example1cg">
                                                    <strong>Identificación</strong>
                                                </label>
                                                <input
                                                    type="number"
                                                    id="form3Example0cg"
                                                    className="form-control registro-input text-primary"
                                                    name="identificacion"
                                                    placeholder="Debe estar entre 5 y 10 dígitos"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example1cg">
                                                    <strong>Nombre</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example1cg"
                                                    className="form-control registro-input text-primary"
                                                    name="nombres"
                                                    placeholder="Debe ser de mínimo tres caracteres"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example1cg">
                                                    <strong>Apellido</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example2cg"
                                                    className="form-control registro-input text-primary"
                                                    name="apellidos"
                                                    placeholder="Debe ser de mínimo tres caracteres"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example3cg">
                                                    <strong>Email</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example3cg"
                                                    className="form-control registro-input text-primary"
                                                    name="email"
                                                    placeholder="Debe ser un formato válido. Ejemplo: alguien@gmail.com"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example3cg">
                                                    <strong>Dirección</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example4cg"
                                                    className="form-control registro-input text-primary"
                                                    name="direccion"
                                                    placeholder="Debe ser de mínimo quince caracteres"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example3cg">
                                                    <strong>Teléfono</strong>
                                                </label>
                                                <input
                                                    type="number"
                                                    id="form3Example5cg"
                                                    className="form-control registro-input text-primary"
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
                                                className="form-control registro-input text-primary"
                                                name="fechaNacimiento"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example4cg">
                                                    <strong>Contraseña</strong>
                                                </label>
                                                <input
                                                    type="password"
                                                    id="form3Example7cg"
                                                    className="form-control registro-input text-primary"
                                                    name="password"
                                                    placeholder="Debe contener mínimo una mayúscula, una minúscula, un carácter especial, un número y mínimo ocho caracteres"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example4cg">
                                                    <strong>Repetir contraseña</strong>
                                                </label>
                                                <input
                                                    type="password"
                                                    id="form3Example8cg"
                                                    className="form-control registro-input text-primary"
                                                    name="passRepeat"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example3cg">
                                                    <strong>Departamento</strong>
                                                </label>
                                                <select
                                                    className="form-select registro-input text-primary"
                                                    aria-label="Default select example"
                                                    name="departamento"
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecciona un departamento</option>
                                                    {colombia.map((elemento, i) => (
                                                        <option key={i} value={elemento.departamento}>
                                                            {elemento.departamento}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-outline mb-4 col-12 col-md-6">
                                                <label className="form-label" htmlFor="form3Example3cg">
                                                    <strong>Ciudad</strong>
                                                </label>
                                                <select
                                                    className="form-select registro-input text-primary"
                                                    aria-label="Default select example"
                                                    name="ciudad"
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecciona una ciudad</option>
                                                    {values.departamento !== "" &&
                                                        colombia
                                                            .find(elemento => elemento.departamento === values.departamento)
                                                            .ciudades.map((ciudad, i) => (
                                                                <option key={i} value={ciudad}>
                                                                    {ciudad}
                                                                </option>
                                                            ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="imagen">
                                                <strong>Imagen de perfil</strong>
                                            </label>
                                            <input
                                                type="file"
                                                id="imagen"
                                                className="form-control registro-input text-primary"
                                                name="imagen"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        {imagenPreview && (
                                            <div>
                                                <img
                                                    src={imagenPreview}
                                                    alt="Imagen de Perfil"
                                                    className="img-fluid"
                                                    style={{ maxWidth: "100px", margin: "15 px" }}
                                                />
                                            </div>
                                        )}

                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-block btn-lg text-body bg-primary">
                                                Registrar
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">
                                            ¿Ya tienes cuenta?{" "}
                                            <Link to="/login" className="fw-bold text-body">
                                                <u>Inicia sesión aquí</u>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <Foot />
        </div>
    );
}