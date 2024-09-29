import Carrusel from "./components/carrusel/Carrusel";
import Foot from "./components/footer/Foot";
import Nav from "./components/nav/Nav";
import PaginaPrincipal from "./components/paginador/PaginaPrincipal";

export default function App() {
    return (
        <div>
            <Nav />
            <Carrusel />
            <PaginaPrincipal />
            <Foot />
        </div>
    );
}
