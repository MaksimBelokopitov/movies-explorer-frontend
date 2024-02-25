import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function MoviesCardList({moviesList, deleteMovie, savedMoviesList, likeMovie}) {

  const appContext = useContext(AppContext)

  return(
    <section className='section-movie'>
      <ul className="section-movie__list">
       {moviesList.map((item)=>
          <MoviesCard
          key={item.trailerLink}
          card={item}
          deleteMovie={deleteMovie}
          savedMoviesList={savedMoviesList}
          likeMovie={likeMovie}
        />
        )}
      </ul>
      {appContext.buttonMoreVisible&&
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