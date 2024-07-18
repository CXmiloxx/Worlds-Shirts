import { Link } from "react-router-dom";
import './Recuperar.css';

export default function Recuperar() {
    return (
        <div className="recuperar-container">
            <section className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border-0 rounded-3 shadow-sm">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <Link to='/'>
                                            <img src='icono_champions.jpeg' alt="Logo" width="175" height="57" className="img-fluid"/>
                                        </Link>
                                    </div>
                                    <h2 className="text-center">Recuperar Contraseña</h2>
                                    <p className="text-center text-muted mb-4">Ingresa tu correo para recuperar tu contraseña.</p>
                                    <form action="#!">
                                        <div className="form-floating">
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                name="email" 
                                                id="email" 
                                                placeholder="name@example.com" 
                                                required 
                                            />
                                            <label htmlFor="email">Correo</label>
                                        </div>
                                        <div className="d-grid my-3">
                                            <button className="btn btn-primary btn-lg" type="submit">
                                                <i className="fas fa-key me-2"></i>Recuperar Contraseña
                                            </button>
                                        </div>
                                        <div className="d-flex gap-2 justify-content-between">
                                            <Link to='/Login' className="text-blue-50">Iniciar Sesión</Link>
                                            <Link to='/Registro' className="text-blue-50">Crear una Cuenta</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
