import './redesSociales.css';

export default function RedesSociales(){
    return (
        <div className="container-bar">
            <div className='icon-social'>
                <a href='' className='me-4 text-reset icon-facebook'><span id='title'>facebook</span><i className='bi bi-facebook'></i></a>
                <a href='' className='me-4 text-reset icon-twitter'><span id='title'>X</span><i className='bi bi-twitter-x'></i></a>
                <a href='' className='me-4 text-reset icon-Google'><span id='title'>Google</span><i className='bi bi-envelope-at-fill'></i></a>
                <a href='' className='me-4 text-reset icon-linkedin'><span id='title'>LinkedIn</span><i className='bi bi-linkedin'></i></a>
                <a href='' className='me-4 text-reset icon-github'><span id='title'>GitHub</span><i className='bi bi-github'></i></a>
                <a href='' className='me-4 text-reset icon-pinterest'><span id='title'>Pinterest</span><i className='bi bi-pinterest'></i></a>
                <a href='https://wa.me/+573207512575' className='me-4 text-reset icon-whatsapp'><span id='title'>whatsapp</span><i className='bi bi-whatsapp'></i></a>
            </div>
        </div>
    );
}