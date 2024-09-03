import { useEffect, useState } from 'react';
import Cards from './Cards';

export default function CardList() {
    const [dataProducto, setDataProducto] = useState([]);
    const URL = import.meta.env.VITE_APP_ENVIROMENT;

    useEffect(() => {
        fetch(`${URL}/productos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        })
        .then((data) => {
            data.forEach(producto => {
                producto.nombreProducto,
                producto.marca,
                producto.precio,
                producto.image
            });
            setDataProducto(data);
            localStorage.getItem('totalProductos', data.length);
        })
    })
    
    const cards = dataProducto.map((productos, index) => (
        <Cards key={index} productos={productos} />
    ));

    return (
        <div className='divCards'>
            {cards}
        </div>
    );
}

