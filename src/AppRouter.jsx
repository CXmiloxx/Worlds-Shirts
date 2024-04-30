import {Routes, Route, HashRouter} from 'react-router-dom';
import Inicio from "./App"
import Registro from './components/registro/Registro';
import NotFound from './NotFountd';
import LoginUser from './components/login/LoginUser';

import Usuario from "./components/usuarioRegistrado/Usuario";

function AppRouter(){

    return(

        <HashRouter>
            <Routes>
                <Route exact path='/' element={<Inicio/>} />
                <Route exact path='/registro' element={<Registro/>} />
                <Route exact path='/login' element={<LoginUser/>} />
                <Route exact path='/sesion-iniciada' element={<Usuario/>} />
                <Route exact path='*' element={<NotFound/>} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;