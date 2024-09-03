import { useState,useEffect} from "react";
export default function Paginador() {
    const [cantidadProductos, setCantidadProductos] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        const storedCantidadProductos = localStorage.getItem('totalProductos');
        if(storedCantidadProductos){
            setCantidadProductos(parseInt(storedCantidadProductos));
        }
    },[]);

    const paginas = [];
    for(let i = 1; i <= Math.ceil(cantidadProductos / 10); i++){
        paginas.push(i);
    }
    
    const anterior = () => {
        if(paginaActual > 1){
            setPaginaActual(paginaActual - 1);
        }
    }
    
    const siguiente = () => {
        if(paginaActual < Math.ceil(cantidadProductos / 10)){
            setPaginaActual(paginaActual + 1);
        }
    }
    
    const paginar = (pagina) => {
        setPaginaActual(pagina);
        localStorage.setItem('paginaActual', pagina);
    }
    
    useEffect(() => {
        localStorage.setItem('paginaActual', paginaActual);
    },[paginaActual]);
    
    return (
        <div>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => anterior()}>&laquo;</button>
                </li>
                {paginas.map(pagina => (
                    <li key={pagina} className={`page-item ${paginaActual === pagina? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginar(pagina)}>{pagina}</button>
                    </li>
                ))}
                <li className={`page-item ${paginaActual === cantidadProductos? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => siguiente()}>&raquo;</button>
                </li>
            </ul>
            <p>Pagina {paginaActual} de {cantidadProductos}</p>
        </div>
    )
}
