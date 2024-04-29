import CardList from "./components/body/CardList";
import Carrusel from "./components/carrusel/Carrusel";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";


export default function App(){
    return(
        <div>
            <Nav/>
            <Carrusel/>
            <CardList/>
            <Footer/>
        </div>
    )



}