import { useState} from 'react';
import CardList from '../body/CardList';
import Paginador from './Paginador';

export default function PaginaPrincipal() {
    const [paginaActual, setPaginaActual] = useState(1);

    return (
        <div>
            <CardList paginaActual={paginaActual} />
            <Paginador
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
            />
        </div>
    );
}
