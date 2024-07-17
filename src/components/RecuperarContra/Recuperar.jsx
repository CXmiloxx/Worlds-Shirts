import { Link } from "react-router-dom";

export default function Recuperar() {
    return (
        <div>
            <section className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="text-center mb-4">
                                        <Link to='/'>
                                        <img src='icono_champions.jpeg' alt="Logo" width="175" height="57" className="img-fluid"/>
                                        </Link>
                                    </div>
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Ingresa tu correo.</h2>
                                    <form action="#!">
                                        <div className="mb-3">
                                            <div className="form-floating">
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    name="email" 
                                                    id="email" 
                                                    placeholder="name@example.com" 
                                                    required 
                                                />
                                                <label htmlFor="email" className="form-label">Correo</label>
                                            </div>
                                        </div>
                                        <div className="d-grid my-3">
                                            <button className="btn btn-primary btn-lg" type="submit">Recuperar Contraseña</button>
                                        </div>
                                        <div className="d-flex gap-2 justify-content-between">
                                            <Link to='/login' className="text-blue-50 fw-bold"> Iniciar Sesion</Link>
                                        </div>
                                        <div className="d-flex gap-2 justify-content-between">
                                            <Link to='/registro' className="text-blue-50 fw-bold"> Crear una Cuenta</Link>
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
