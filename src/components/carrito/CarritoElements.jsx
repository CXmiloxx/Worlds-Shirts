import { useContext, useEffect, useState } from "react";
import { dataContext } from "../context/DataContext";
import CarritoVacio from './CarritoVacio';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


function CarritoElements() {
    const { productosCarrito, setProductosCarrito } = useContext(dataContext);
    const [total, setTotal] = useState(0);

    // useEffect para calcular el total del carrito cada vez que los productos cambian
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

    // Funcion para eliminar un producto del carrito
    const eliminarProducto = (id) => {
        
        Swal.fire({
            title: "Estas seguro de Eliminar el producto",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Eliminar Producto",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                const productosActualizados = productosCarrito.filter((producto) => producto.id !== id);
                setProductosCarrito(productosActualizados);
            }
        });
        
    };

    // Funcion para actualizar la cantidad de un producto en el carrito
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
                title: "Estas seguro de Eliminar Todos los Productos",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "Eliminar Productos",
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
        <div>
            <section className="h-100">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="mb-0 text-danger fs-2 fst-italic">Carrito</h3>
                            </div>
                            {productosCarrito.map((producto) => (
                                <div key={producto.id} className="card rounded-3 mb-4">
                                    <div className="card-body p-4">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                <img src={producto.image} className="img-fluid rounded-3" alt="Product" />
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-3">
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
                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                <h5 className="mb-0">${producto.precioCarrito} </h5>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <button className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>
                                                    <i className=""> Eliminar</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="card mt-4">
                                <div className="card-body text-center">
                                    <h4 className="mb-0">Total: ${total}</h4>
                                </div>
                            </div>
                            <button type="button" className="btn btn-danger btn-block btn-lg" onClick={limpiarCarrito}>
                                Limpiar Carrito
                            </button>
                            <Link type="button" className="btn btn-danger btn-block btn-lg m-4" to="/">
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
