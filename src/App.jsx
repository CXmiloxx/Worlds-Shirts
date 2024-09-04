import Carrusel from "./components/carrusel/Carrusel";
import Foot from "./components/footer/Foot";
import Nav from "./components/nav/Nav";
import PaginaPrincipal from "./components/paginador/PaginaPrincipal";
import RedesSociales from "./components/redesSociales/RedesSociales";

export default function App() {
    return (
        <div>
            <Nav />
            <RedesSociales/>
            <Carrusel />
            <PaginaPrincipal />
            <Foot />
        </div>
    );
}
