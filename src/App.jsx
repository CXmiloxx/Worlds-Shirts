import CardList from "./components/body/CardList";
import Carrusel from "./components/carrusel/Carrusel";
import Foot from "./components/footer/Foot";
import Nav from "./components/nav/Nav";
import Paginador from "./components/paginador/Paginador";
import RedesSociales from "./components/redesSociales/RedesSociales";

export default function App() {
    return (
        <div>
            <Nav />
            <RedesSociales/>
            <Carrusel />
            <CardList />
            <Paginador/>
            <Foot />
        </div>
    );
}
