import { useState, useRef } from "react";
import Swal from "sweetalert2";
import "./css/RegistroProductos.css";

export default function RegistroProductos() {
    const form = useRef();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const URL = import.meta.env.VITE_APP_ENVIROMENT;

    const [producto, setProducto] = useState({
        nombreProducto: "",
        marca: "",
        fechaLanzamiento: "",
        descripcionProducto: "",
        cantidad: 1,
        precio: "",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(producto).forEach((key) => {
            formData.append(key, producto[key]);
        });
        if (image) {
            formData.append("image", image);
        }

        fetch(`${URL}/nuevosProductos`, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "Producto registrado correctamente!",
                        icon: "success",
                        confirmButtonText: "Continuar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            form.current.reset();
                            setImagePreview(null);
                            setProducto({
                                nombreProducto: "",
                                marca: "",
                                fechaLanzamiento: "",
                                descripcionProducto: "",
                                cantidad: 1,
                                precio: "",
                            });
                        }
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error al registrar el producto!",
                    icon: "error",
                    text: `Error al registrar el producto: ${error}`,
                    confirmButtonText: "Continuar",
                });
            });
    };

    return (
        <div className="registro-producto-container">
            <h1 className="registro-producto-titulo">Registro de Producto</h1>
            <div className="registro-producto-card">
                <form onSubmit={handleSubmit} ref={form}>
                    <div className="form-group">
                        <label htmlFor="nombreProducto" className="form-label">Nombre del Producto</label>
                        <input
                            type="text"
                            className="form-input"
                            id="nombreProducto"
                            name="nombreProducto"
                            value={producto.nombreProducto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="marca" className="form-label">Marca</label>
                        <input
                            type="text"
                            className="form-input"
                            id="marca"
                            name="marca"
                            value={producto.marca}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fechaLanzamiento" className="form-label">Fecha de Lanzamiento</label>
                        <input
                            type="date"
                            className="form-input"
                            id="fechaLanzamiento"
                            name="fechaLanzamiento"
                            value={producto.fechaLanzamiento}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcionProducto" className="form-label">Descripción</label>
                        <textarea
                            className="form-input"
                            id="descripcionProducto"
                            name="descripcionProducto"
                            rows="3"
                            value={producto.descripcionProducto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="precio" className="form-label">Precio</label>
                        <input
                            type="number"
                            className="form-input"
                            id="precio"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imagen" className="form-label">Imagen del Producto</label>
                        <input
                            type="file"
                            className="form-input"
                            id="imagen"
                            name="imagen"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="image-preview-container">
                                <img
                                    src={imagePreview}
                                    alt="Vista previa"
                                    className="image-preview"
                                />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="registro-producto-boton">
                        Registrar Producto
                    </button>
                </form>
            </div>
        </div>
    );
}
