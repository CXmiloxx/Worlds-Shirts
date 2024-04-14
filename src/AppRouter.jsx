import {Routes, Route, HashRouter} from 'react-router-dom';
import Inicio from "./App"
import Registro from './components/registro/Registro';
import NotFound from './NotFountd';
function AppRouter(){


    return(

        <HashRouter>
            <Routes>
                <Route exact path='/' element={<Inicio/>} />
                <Route exact path='/registro' element={<Registro/>} />
                <Route exact path='*' element={<NotFound/>} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;