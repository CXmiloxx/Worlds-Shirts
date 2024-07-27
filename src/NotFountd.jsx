import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <p className="fs-3 text-secondary">
                    <span className="text-danger">Oops!</span> Página no encontrada.
                </p>
                <p className="lead">
                    La página que estás buscando no existe.
                </p>
                <Link to="/" className="btn btn-primary">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
