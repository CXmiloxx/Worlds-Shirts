import './Nav.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../context/DataContext';
import { FaShoppingCart } from 'react-icons/fa';
import MagidMenu from '../MagidMenu/MagidMenu';
function Nav() {
    const { cantidadElementosUnicos } = useContext(dataContext);
    
    return (
        <div className='nav-container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src='icono_champions.jpeg' className='logo' alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <MagidMenu/>
                        <div className="d-flex align-items-center">
                            <Link to="/Carrito" className="cart-link position-relative">
                                <FaShoppingCart size={32} />
                                {cantidadElementosUnicos > 0 && (
                                    <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cantidadElementosUnicos}
                                    </span>
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
