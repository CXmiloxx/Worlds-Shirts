import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import CardList from '../body/CardList';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import user from "../../usuariosRegistrados.json";
import "./Usuario.css";

const cookies = new Cookies();

function UsuarioRegistrado() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = cookies.get('userId');
        if(userId){
            const foundUser = user.find(user => user.id === userId);
            if(foundUser){
                setUserData(foundUser);
            }else{
                Swal.fire({
                    title: "No se puede encontro el usuario  en el servidor",
                    icon: "error"
                })
            }
        }else{
            window.location.href = "/";
        }
    }, []);
    function Cerrar() {
        Swal.fire({
            title: "Estas seguro de cerrar sesión",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Cerrar sesión",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/";
            }
        });
    }

    return (
        <div className='contenedor'>
            <div className="userData">
                {userData && (
                    <div className="userDetails">
                        <p><span className="label">Nombre:</span> {userData.nombres} {userData.apellidos}</p>
                        <p><span className="label">Correo:</span> {userData.email}</p>
                    </div>
                )}
            </div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <img src='icono_champions.jpeg' className='logo' alt="logo" />
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
                        </ul>
                        <button className='cerras-sesion' onClick={Cerrar}> Cerrar Sesión </button>
                    </div>
                </div>
            </nav>
            <CardList />
            <Footer />
        </div>
    );
}

export default UsuarioRegistrado;
