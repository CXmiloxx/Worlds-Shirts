import CardList from "./components/body/CardList";
import Carrusel from "./components/carrusel/Carrusel";
import Foot from "./components/footer/Foot";
import Nav from "./components/nav/Nav";



export default function App(){
    return(
        <div>
            <Nav/>
            <Carrusel/>
            <CardList/>
            <Foot/>
        </div>
    )



}