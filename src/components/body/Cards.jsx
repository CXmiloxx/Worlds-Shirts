/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './card.css';
import { dataContext } from '../context/DataContext';

export default function Cards({ productos }) {
    const { productosCarrito, setProductosCarrito } = useContext(dataContext);

    const addToProduct = () => {
        const isItemFound = productosCarrito.find((producto) => producto.id === productos.id);
        if (isItemFound) {
            setProductosCarrito((currentProduct) => {
                return currentProduct.map((producto) => {
                    if (producto.id === productos.id) {
                        return {
                            ...producto,
                            cantidad: producto.cantidad + 1,
                            precioCarrito: producto.precio * (producto.cantidad + 1)
                        };
                    } else {
                        return producto;
                    }
                });
            });
        } else {
            setProductosCarrito((currentProduct) => {
                return [...currentProduct, { ...productos, cantidad: 1, precioCarrito: productos.precio }];
            });
        }
    };

    return (
        <div className="card2">
            <img className='contImg' src={productos.image} alt="logo" />
            <div>
                <h5>{productos.title}</h5>
                <h6 className="precio">PRECIO: {productos.precio}</h6>
                <h6 className='autor'>Marca : {productos.autor}</h6>
                <button type="button" className="btn btn-outline-primary" onClick={addToProduct}>Comprar</button>
            </div>
        </div>
    );
}
