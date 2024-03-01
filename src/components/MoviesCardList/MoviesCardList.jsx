import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect} from 'react';

function MoviesCardList({
  filteredList,
  deleteMovie,
  savedMoviesList,
  likeMovie,
  buttonMoreVisible,
  showCards}) {

  const appContext = useContext(AppContext);

  useEffect(() => {
    showCards();
  },[filteredList])

  return(
    <section className='section-movie'>
        <ul className="section-movie__list">
          {filteredList.map((item)=>
            <MoviesCard
              key={item.id || item._id}
              card={item}
              deleteMovie={deleteMovie}
              savedMoviesList={savedMoviesList}
              likeMovie={likeMovie}
            />
          )}
        </ul>
      {buttonMoreVisible&&
          <button
            className='section-movie__button'
            type='button'
            onClick={appContext.handleButtonMoreClick}>
              Еще
          </button>
        }
    </section>
  );
};

export default MoviesCardList