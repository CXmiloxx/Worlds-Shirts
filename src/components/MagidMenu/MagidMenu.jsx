import { useState, } from "react";
import './MagidMenu.css';
import { Link } from "react-router-dom";

export default function MagidMenu() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index, action) => {
        setActiveIndex(index);
        if (action) {
            action();
        }
    };

    const WhatsApp = () => {
        window.open(`https://wa.link/aydr3e`, '_blank');
    };

    return (
        <div className="menu-container">
            <div className="menu-navigation">
                <ul className="menu-list">
                    <li
                        className={`menu-item ${activeIndex === 0 ? 'menu-active' : ''}`}
                        onClick={() => handleClick(0)}
                    >
                        <a href="#">
                            <span className="menu-icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="menu-text">Home</span>
                        </a>
                    </li>
                    <li
                        className={`menu-item ${activeIndex === 1 ? 'menu-active' : ''}`}
                        onClick={() => handleClick(1)}
                    >
                        <Link to="/Registro">
                            <span className="menu-icon">
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <span className="menu-text">Registro</span>
                        </Link>
                    </li>
                    <li
                        className={`menu-item ${activeIndex === 2 ? 'menu-active' : ''}`}
                        onClick={() => handleClick(2, WhatsApp)}
                    >
                        <a href="#">
                            <span className="menu-icon">
                                <ion-icon name="chatbubble-outline"></ion-icon>
                            </span>
                            <span className="menu-text">WhatsApp</span>
                        </a>
                    </li>
                    <li
                        className={`menu-item ${activeIndex === 3 ? 'menu-active' : ''}`}
                        onClick={() => handleClick(3)}
                    >
                        <Link to={'/login'}>
                        <span className="menu-icon">
                            <ion-icon name="log-in-outline"></ion-icon>
                        </span>
                            <span className="menu-text">Login</span>
                        </Link>
                    </li>
                </ul>
                <div
                    className="menu-indicator"
                    style={{ transform: `translateX(${activeIndex * 100}px)` }}
                ></div>
            </div>
        </div>
    );
}
