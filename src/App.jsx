import CardList from "./components/body/CardList";
import Carrusel from "./components/carrusel/Carrusel";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer"



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