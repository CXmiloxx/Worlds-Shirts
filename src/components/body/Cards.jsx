import './card.css'

export default function Cards(props){
    return(
        <>
            <div className="card2">
                <img src={props.items.image} alt="logo"/>
                <div>
                    <h5>{props.items.title}</h5>
                    <span className="precio">PRECIO : {props.items.precio}</span>
                    
                    <br></br>

                    <button type="button" className="btn btn-outline-primary">Comprar</button>
                </div>
            </div>
        </>
    )
}