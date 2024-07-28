import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_APP_ENVIROMENT;

export default function Admin() {

    function Cerrar() {
        Swal.fire({
            title: "¿Estás seguro de cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Cerrar sesión",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.hash = "/Login";
            }
        });
    }

    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch(`${URL}/usuariosBD`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }

            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            setError(error.message);
        }
    };

    const actualizarUsuario = (usuario) => {
        setSelectedUsuario(usuario);
        // eslint-disable-next-line no-undef
        const modal = new bootstrap.Modal(document.getElementById('modalActualizar'));
        modal.show();
    };

    const handleActualizarSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${URL}/actualizarUsuarioBd`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }

            const result = await response.json();
            Swal.fire('Actualizado!', result.message, 'success');
            fetchUsuarios();
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            setError(error.message);
        }
    };

    const eliminarUsuario = (identificacion) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este usuario?',
            text: "Una vez eliminado, no se podrá recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${URL}/eliminarusuarioBd`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({ identificacion })
                    });

                    if (!response.ok) {
                        throw new Error('La respuesta de la red no fue correcta');
                    }

                    const data = await response.json();
                    setUsuarios((prevUsuarios) => prevUsuarios.filter(user => user.identificacion !== identificacion));

                    Swal.fire('Eliminado!', data.message, 'success');
                } catch (error) {
                    console.error('Error al eliminar el usuario:', error);
                    setError(error.message);
                }
            }
        });
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div>
            <button className='cerrar-sesion btn btn-danger ms-3' onClick={Cerrar}>Cerrar Sesión</button>
            <h2 className="text-center m-2 p-3 bg-primary text-light rounded fs-2">Panel de Administración</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-bordered">
                <thead className="bg-dark text-light text-center">
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">CEDULA</th>
                        <th scope="col">NOMBRES</th>
                        <th scope="col">APELLIDOS</th>
                        <th scope="col">TELEFONO</th>
                        <th scope="col">DIRECCION</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">Eliminar</th>
                        <th scope="col">Actualizar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario, index) => (
                            <tr key={usuario.identificacion}>
                                <td>{index + 1}</td>
                                <td>{usuario.identificacion}</td>
                                <td>{usuario.nombres}</td>
                                <td>{usuario.apellidos}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.direccion}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => eliminarUsuario(usuario.identificacion)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => actualizarUsuario(usuario)}
                                    >
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No hay usuarios disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedUsuario && (
                <div className="modal fade" id="modalActualizar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Actualizar Información</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="formActualizar" onSubmit={handleActualizarSubmit}>
                                    <input type="hidden" name="identificacion" defaultValue={selectedUsuario.identificacion} />
                                    <label className="form-label" htmlFor="nombresActualizar">NOMBRES</label>
                                    <input type="text" name="nombres" id="nombresActualizar" className="form-control" defaultValue={selectedUsuario.nombres} required />
                                    <label className="form-label" htmlFor="apellidosActualizar">APELLIDOS</label>
                                    <input type="text" name="apellidos" id="apellidosActualizar" className="form-control" defaultValue={selectedUsuario.apellidos} required />
                                    <label className="form-label" htmlFor="telefonoActualizar">TELEFONO</label>
                                    <input type="number" name="telefono" id="telefonoActualizar" className="form-control" defaultValue={selectedUsuario.telefono} required />
                                    <label className="form-label" htmlFor="direccionActualizar">DIRECCION</label>
                                    <input type="text" name="direccion" id="direccionActualizar" className="form-control" defaultValue={selectedUsuario.direccion} required />
                                    <label className="form-label" htmlFor="emailActualizar">EMAIL</label>
                                    <input type="email" name="email" id="emailActualizar" className="form-control" defaultValue={selectedUsuario.email} required />
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-primary">Actualizar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
