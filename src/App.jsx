import CardList from "./components/body/CardList";
import Carrusel from "./components/carrusel/Carrusel";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";


export default function App(){
    return(
        <div>
            <Header/>
            <Carrusel/>
            <CardList/>
            <Footer/>

        </div>
    )



}