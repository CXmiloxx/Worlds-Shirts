import { Link } from 'react-router-dom';
import Foot from '../footer/Foot';
import CardList from '../body/CardList';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import "./Usuario.css";
import SesionExpired from '../sesionExpired/SesionExpirent';

function UsuarioRegistrado() {
    const cookies = new Cookies();
    const email = cookies.get('email');
    const nombres = cookies.get('nombres');
    const apellidos = cookies.get('apellidos');

    function Cerrar() {
        Swal.fire({
            title: "Estas seguro de cerrar sesión",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Cerrar sesión",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                cookies.remove('email');
                cookies.remove('nombres');
                cookies.remove('apellidos');
                window.location.href = "/";
            }
        });
    }

    return (
        <div className='contenedor'>
            <div className="userData">
                {email || nombres && apellidos ? (
                    <div className="userDetails">
                        <p><span className="label">Correo:</span> {email}</p>
                        <p><span className="label">Nombre:</span> {nombres} {apellidos}</p>
                    </div>
                ) : (
                    <p>No se encontró información del usuario.</p>
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
            <Foot/>
            <SesionExpired />
        </div>
    );
}

export default UsuarioRegistrado;
