import img from "./img/carrito.jpg";
function CarritoVacio() {
    return (
        <div>
            <div className="container-fluid  mt-100">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                            </div>
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img src={img} alt='carrito-vacio' width="130" height="130" className="img-fluid mb-4 mr-3" />
                                    <h3><strong>Carrito Vacio</strong></h3>
                                    <h4>Sigue Comprando 😃</h4>
                                    <a href="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Continuar Comprnado </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarritoVacio
