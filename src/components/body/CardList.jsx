import Cards from './Cards';
import data from './Data';

function CardList() {
    const cards = data.map(productos => (
        <Cards key={productos.id} productos={productos} />
    ));

    return (
        <div className='divCards'>
            {cards}
        </div>
    );
}

export default CardList;
