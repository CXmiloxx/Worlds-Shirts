import Cards from './Cards';
import data from './Data';

function CardList() {
    const cards = data.map(items => (
        <Cards key={items.id} items={items} />
    ));

    return (
        <div className='divCards'>
            {cards}
        </div>
    );
}

export default CardList;
