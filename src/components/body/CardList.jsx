/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Cards from './Cards';

export default function CardList({ paginaActual }) {
    const [dataProducto, setDataProducto] = useState([]);
    const productosPorPagina = 4;
    const URL = import.meta.env.VITE_APP_ENVIROMENT;

    useEffect(() => {
        fetch(`${URL}/productos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        })
        .then((data) => {
            setDataProducto(data);
            localStorage.setItem('totalProductos', data.length);
        })
        .catch((error) => {
            console.error('Error al obtener los productos:', error);
        });
    }, [URL]);

const indiceInicial = (paginaActual - 1) * productosPorPagina;

const indiceFinal = indiceInicial + productosPorPagina;

const productosPaginados = [];

for (let i = indiceInicial; i < indiceFinal && i < dataProducto.length; i++) {
    productosPaginados.push(dataProducto[i]);
}


    const cards = productosPaginados.map((producto, index) => (
        <Cards key={index} productos={producto} />
    ));

    return (
        <div className='divCards'>
            {cards}
        </div>
    );
}
