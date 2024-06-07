import { useContext } from "react";
import { dataContext } from "../context/DataContext";
import CarritoVacio from './CarritoVacio';

function CarritoElements() {
    const { productosCarrito, setProductosCarrito } = useContext(dataContext);

    const eliminarProducto = (id) => {
        const productoFiltrado = productosCarrito.filter((producto) => producto.id !== id);
        setProductosCarrito(productoFiltrado);
    };

    const actualizarCantidad = (id, nuevaCantidad) => {
        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
            return;
        }
        setProductosCarrito((productosActuales) => {
            return productosActuales.map((producto) => {
                if (producto.id === id) {
                    return { ...producto, cantidad: nuevaCantidad, precioCarrito: producto.precio * nuevaCantidad };
                } else {
                    return producto;
                }
            });
        });
    };

    const calcularPrecio = (id, nuevaCantidad) => {
        const producto = productosCarrito.find((producto) => producto.id === id);
        if (producto) {
            return producto.precio * nuevaCantidad;
        }
        return 0;
    };

    const limpiarCarrito = () => {
        setProductosCarrito([]);
    };

    if (productosCarrito.length === 0) {
        return <CarritoVacio />;
    }

    return (
        <div>
            <section className="h-100">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100" id="pas">
                        <div className="col-10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                            </div>
                            {productosCarrito.map((producto) => (
                                <div key={producto.id} className="card rounded-3 mb-4">
                                    <div className="card-body p-4" id="cards">
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
                                                <h5 className="mb-0">${calcularPrecio(producto.id, producto.cantidad)}</h5>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <button className="text-danger btn btn-link" onClick={() => eliminarProducto(producto.id)}>
                                                    <i className="fas fa-trash fa-lg"> Eliminar</i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex justify-content-center">
                                            <button className="btn btn-link px-2" onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}>
                                                <i className="fas fa-minus"> Disminuir</i>
                                            </button>
                                            <button className="btn btn-link px-2" onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}>
                                                <i className="fas fa-plus"> Aumentar</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-danger btn-block btn-lg" onClick={limpiarCarrito}>
                                Limpiar Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CarritoElements;
