import './Nav.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../context/DataContext';
import { FaShoppingCart } from 'react-icons/fa';

function Nav() {
    const { cantidadElementosUnicos } = useContext(dataContext);

    return (
        <div className='contenedor'>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link to="/">
                        <img src='icono_champions.jpeg' className='logo' alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tutoriales" className="nav-link">Tutoriales</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/referencias" className="nav-link">Referencias</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/recursos" className="nav-link">Recursos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contacto" className="nav-link">Contacto</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/registro" className="nav-link">Registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Iniciar sesión</Link>
                            </li>
                        </ul>
                        <div className="cart-container">
                            <Link to="/Carrito" className="cart-link">
                                <FaShoppingCart size={34} />
                                {cantidadElementosUnicos > 0 && (
                                    <span className="cart-count">{cantidadElementosUnicos}</span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
