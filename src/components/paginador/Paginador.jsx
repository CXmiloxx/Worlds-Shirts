/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function Paginador({ paginaActual, setPaginaActual }) {
    const [cantidadProductos, setCantidadProductos] = useState(0);
    const productosPorPagina = 5;

    useEffect(() => {
        const storedCantidadProductos = localStorage.getItem('totalProductos');
        if (storedCantidadProductos) {
            setCantidadProductos(parseInt(storedCantidadProductos));
        }
    }, []);

    const totalPaginas = Math.ceil(cantidadProductos / productosPorPagina);

    const anterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const siguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const paginar = (pagina) => {
        setPaginaActual(pagina);
    };

    useEffect(() => {
        localStorage.setItem('paginaActual', paginaActual);
    }, [paginaActual]);

    return (
        <div>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={anterior}>&laquo;</button>
                </li>
                {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(pagina => (
                    <li key={pagina} className={`page-item ${paginaActual === pagina ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginar(pagina)}>{pagina}</button>
                    </li>
                ))}
                <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={siguiente}>&raquo;</button>
                </li>
            </ul>
            <p>Pagina {paginaActual} de {totalPaginas}</p>
        </div>
    );
}
