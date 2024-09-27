import './Nav.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { dataContext } from '../context/DataContext';
import { FaShoppingCart } from 'react-icons/fa';
import MagidMenu from '../MagidMenu/MagidMenu';

function Nav() {
    const { cantidadElementosUnicos } = useContext(dataContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='nav-container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src='icono_champions.jpeg' className='logo' alt="logo" />
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        onClick={toggleMenu} 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded={isOpen} 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
                        <MagidMenu />
                        <div className="d-flex align-items-center ms-auto">
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
