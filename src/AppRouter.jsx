import { Routes, Route, HashRouter } from 'react-router-dom';
import Inicio from "./App";
import Registro from './components/registro/Registro';
import NotFound from './NotFountd';
import LoginUser from './components/login/LoginUser';
import DataProvider from './components/context/DataContext';
import Usuario from "./components/usuarioRegistrado/Usuario";
import CarritoVacio from './components/carrito/CarritoVacio';
import CarritoElements from './components/carrito/CarritoElements';

function AppRouter() {
    return (
        <DataProvider>
            <HashRouter>
                <Routes>
                    <Route exact path='/' element={<Inicio />} />
                    <Route exact path='/registro' element={<Registro />} />
                    <Route exact path='/login' element={<LoginUser />} />
                    <Route exact path='/iniciada' element={<Usuario />} />
                    <Route exact path='/Carrito' element={<CarritoElements />} />
                    <Route exact path='/Carrito-vacio' element={<CarritoVacio />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </HashRouter>
        </DataProvider>
    );
}

export default AppRouter;
