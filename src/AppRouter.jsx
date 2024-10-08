import { Routes, Route, HashRouter } from 'react-router-dom';
import Inicio from "./App";
import Registro from './components/registro/Registro';
import NotFound from './NotFountd';
import LoginUser from './components/login/LoginUser';
import DataProvider from './components/context/DataContext';
import Usuario from "./components/usuarioRegistrado/Usuario";
import CarritoVacio from './components/carrito/CarritoVacio';
import CarritoElements from './components/carrito/CarritoElements';
import Recuperar from './components/RecuperarContra/Recuperar';
import Admin from './components/administrador/Admin';
import RegistroProductos from './components/administrador/RegistroProductos';
import PrivateRoute from './PrivateRoute';

function AppRouter() {
    return (
        <DataProvider>
            <HashRouter>
                <Routes>
                    <Route exact path='/' element={<Inicio />} />
                    <Route exact path='/Registro' element={<Registro />} />
                    <Route exact path='/Login' element={<LoginUser />} />
                    <Route exact path='/CarritoVacio' element={<CarritoVacio />} />
                    <Route exact path='/Iniciada' element={<PrivateRoute element={<Usuario />} />} />
                    <Route exact path='/Adiministrador' element={<PrivateRoute element={<Admin />} />} />
                    <Route exact path='/Carrito' element={<PrivateRoute element={<CarritoElements />} />} />
                    <Route exact path='/Recuperar' element={<Recuperar/>} />
                    <Route exact path='/RegistroProductos' element={<PrivateRoute element={<RegistroProductos />} />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </HashRouter>
        </DataProvider>
    );
}

export default AppRouter;
