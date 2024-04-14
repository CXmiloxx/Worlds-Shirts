import './footer.css';

function Footer() {
    return (
        <footer className="text-center text-lg-start bg-light text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>Puedes contactarme por:</span>
                </div>
                <div>
                    <a href="https://www.facebook.com/guxpacha?mibextid=ibOpuV " className="me-4 text-reset" target='_blank'>
                        <i className="bi bi-facebook"></i>
                    </a>

                    <a href="www.linkedin.com/in/camilo-guapacha-a6732b270" className="me-4 text-reset" target='_blank'>
                        <i className="bi bi-linkedin"></i>
                    </a>

                    <a href="https://github.com/CXmiloxx" className="me-4 text-reset" target='_blank'>
                        <i className="bi bi-github"></i>
                    </a>

                    <a href="https://www.instagram.com/invites/contact/?i=x506ztzafucp&utm_content=5d1hvl8" className="me-4 text-reset" target='_blank'>
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </section>
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>Worlds shirts
                            </h6>
                            <p>
                                Venta de camisas de fútbol de equipos europeos que se enfoca en la calidad y los diseños de buenas camisas de fútbol
                            </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Productos
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Camisas</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                            <p><i className="fas fa-home me-3"></i> Colombia, Pereira</p>
                            <p><i className="fas fa-envelope me-3"></i> juancamilog9911@gmail.com</p>
                            <p><i className="fas fa-phone me-3"></i> + 57 3207522575</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4">
                © 2024 Words Shits. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;
