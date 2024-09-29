/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Cards from './Cards';
import Loader from '../UI/Loader'; 

export default function CardList({ paginaActual }) {
    const [dataProducto, setDataProducto] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar si está cargando
    const productosPorPagina = 4;
    const URL = import.meta.env.VITE_APP_ENVIROMENT;

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${URL}/productos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }

                const data = await response.json();
                setDataProducto(data);
                localStorage.setItem('totalProductos', data.length);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally {
                setLoading(false); // Finaliza la carga después de obtener los datos
            }
        };

        fetchProductos();
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
            {loading ? <Loader /> : cards} {/* Muestra el loader mientras carga */}
        </div>
    );
}
