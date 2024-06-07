/* eslint-disable react/prop-types */
import './card.css';
import { useContext } from 'react';
import { dataContext } from '../context/DataContext';

export default function Cards({ items }) {
    const { productosCarrito, setProductosCarrito } = useContext(dataContext);

    const addToProduct = () => {
        const isItemFound = productosCarrito.find((item) => item.id === items.id);

        if (isItemFound) {
            setProductosCarrito((currentProduct) => {
                return currentProduct.map((item) => {
                    if (item.id === items.id) {
                        return {
                            ...item,
                            cantidad: item.cantidad + 1
                        };
                    } else {
                        return item;
                    }
                });
            });
        } else {
            setProductosCarrito((currentProduct) => {
                return [...currentProduct, { ...items, cantidad: 1 }];
            });
        }
    };

    return (
        <div className="card2">
            <img className='contImg' src={items.image} alt="logo" />
            <div>
                <h5>{items.title}</h5>
                <span className="precio">PRECIO: {items.precio}</span>
                <br />
                <button type="button" className="btn btn-outline-primary" onClick={addToProduct}>Comprar</button>
            </div>
        </div>
    );
}
