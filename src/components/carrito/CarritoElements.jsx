import { useContext, useEffect, useState } from "react";
import { dataContext } from "../context/DataContext";
import CarritoVacio from './CarritoVacio';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CarritoElements.css';

function CarritoElements() {
    const { productosCarrito, setProductosCarrito } = useContext(dataContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calcularTotal = () => {
            let nuevoTotal = 0;
            productosCarrito.forEach((producto) => {
                nuevoTotal += producto.precio * producto.cantidad;
            });
            setTotal(nuevoTotal);
        };

        calcularTotal();
    }, [productosCarrito]);

    const eliminarProducto = (id) => {
        Swal.fire({
            title: "¿Estás seguro de eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                const productosActualizados = productosCarrito.filter((producto) => producto.id !== id);
                setProductosCarrito(productosActualizados);
            }
        });
    };

    const actualizarCantidad = (id, nuevaCantidad) => {
        const productosActualizados = productosCarrito.map((producto) => {
            if (producto.id === id) {
                return { ...producto, cantidad: nuevaCantidad, precioCarrito: producto.precio * nuevaCantidad };
            } else {
                return producto;
            }
        });
        setProductosCarrito(productosActualizados);
    };

    const limpiarCarrito = () => {
        Swal.fire({
            title: "¿Estás seguro de eliminar todos los productos?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setProductosCarrito([]);
            }
        });
    };

    if (productosCarrito.length === 0) {
        return <CarritoVacio />;
    }

    return (
        <div className="carrito-container">
            <section className="h-100">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="mb-0 text-danger fs-2 fst-italic">Carrito</h3>
                            </div>
                            {productosCarrito.map((producto) => (
                                <div key={producto.id} className="card rounded-3 mb-4 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                <img src={producto.image} className="img-fluid rounded-3" alt="Product" />
                                            </div>
                                            <div className="col-md-4 col-lg-4 col-xl-4">
                                                <p className="lead fw-normal mb-2">{producto.title}</p>
                                                <input
                                                    id={producto.id}
                                                    min="1"
                                                    name="quantity"
                                                    value={producto.cantidad}
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    onChange={(e) => {
                                                        const nuevaCantidad = parseInt(e.target.value) || 1;
                                                        actualizarCantidad(producto.id, nuevaCantidad);
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-3 col-lg-2 col-xl-2">
                                                <h5 className="mb-0">${producto.precioCarrito} </h5>
                                            </div>
                                            <div className="col-md-2 col-lg-2 col-xl-2 text-end">
                                                <button className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>
                                                    <i className="">Eliminar</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="card mt-4 shadow-sm total-card">
                                <div className="card-body text-center">
                                    <h4 className="mb-0">Total: ${total}</h4>
                                </div>
                            </div>
                            <button type="button" className="btn btn-danger btn-block btn-lg mt-3" onClick={limpiarCarrito}>
                                Limpiar Carrito
                            </button>
                            <Link type="button" className="btn btn-secondary btn-block btn-lg mt-3" to="/">
                                Volver
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CarritoElements;
