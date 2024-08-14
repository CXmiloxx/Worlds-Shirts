import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import "./Usuario.css";
import { dataContext } from '../context/DataContext';
import imgStandar from "./img/user.png";
import { FaShoppingCart } from 'react-icons/fa';
import CardList from '../body/CardList';
import Foot from '../footer/Foot';

function UsuarioRegistrado() {
    const { cantidadElementosUnicos } = useContext(dataContext);
    const cookies = new Cookies();
    const email = cookies.get('email');
    const nombres = cookies.get('nombres');
    const image = cookies.get('imageUrl');

    function Cerrar() {
        Swal.fire({
            title: "¿Estás seguro de cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Cerrar sesión",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                cookies.remove('email');
                cookies.remove('nombres');
                cookies.remove('imageUrl');
                window.location.hash = "/login";
            }
        });
    }

    return (
        <div className='contenedor'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src={image || imgStandar} alt="profile" className='imgStandar' onClick={() => window.location.href = '/'} onError={(e) => { e.target.src = imgStandar; }} />
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
            <CardList />
            <Foot />
        </div>
    );
}

export default UsuarioRegistrado;
