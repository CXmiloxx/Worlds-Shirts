import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "./Usuario.css";
import { dataContext } from '../context/DataContext';
import imgStandar from "./img/user.png";
import { FaShoppingCart } from 'react-icons/fa';
import Foot from '../footer/Foot';
import PaginaPrincipal from '../paginador/PaginaPrincipal';
import Carrusel from '../carrusel/Carrusel';


function UsuarioRegistrado() {
    const { cantidadElementosUnicos } = useContext(dataContext);
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const storedName = sessionStorage.getItem('nombres');
        const storedEmail = sessionStorage.getItem('email');
        const storedImageUrl = sessionStorage.getItem('urlImagen');
        const storedApellidos = sessionStorage.getItem('apellidos');

        if (storedName) {
            setNombres(storedName);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (storedImageUrl) {
            setImage(storedImageUrl);
        }
        if (storedApellidos) {
            setApellidos(storedApellidos);
        }
    }, []);

    function Cerrar() {
        Swal.fire({
            title: "¿Estás seguro de cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Cerrar sesión",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('nombres');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('urlImagen');
                sessionStorage.removeItem('apellidos');
                window.location.hash = "/login";
            }
        });
    }

    return (
        <div className='contenedor'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img 
                            src={image || imgStandar} 
                            alt="profile" 
                            className='imgStandar' 
                            onClick={() => window.location.href = '/'} 
                            onError={(e) => { e.target.src = imgStandar; }} 
                        />
                    </Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <p className="nav-link"><span className="label">Nombre:</span> {nombres}</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link"><span className="label">Apellidos:</span> {apellidos}</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link"><span className="label">Email:</span> {email}</p>
                            </li>
                            <li className="nav-item">
                                <Link to="/contacto" className="nav-link">Contacto</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            <Link to="/Carrito" className="cart-link position-relative">
                                <FaShoppingCart size={32} />
                                {cantidadElementosUnicos > 0 && (
                                    <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cantidadElementosUnicos}
                                    </span>
                                )}
                            </Link>
                            <button className='cerrar-sesion btn btn-danger ms-3' onClick={Cerrar}>Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </nav>
            <Carrusel />
            <PaginaPrincipal />
            <Foot />
        </div>
    );
}

export default UsuarioRegistrado;
