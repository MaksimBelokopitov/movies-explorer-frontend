import './MoviesCard.css';
import { useContext } from 'react';
import { useLocation, } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { SHORT_MOVIE_TIME_COUNT } from '../../utils/constants';

function MoviesCard({
  card,
  deleteMovie,
  likeMovie,
}) {

  const location = useLocation();
  const appContext = useContext(AppContext);
  let imageLink
  let isLiked

  if(location.pathname ==='/movies'){
    isLiked = appContext.savedMoviesList.some(i => i.movieId === card.id)
  };

  if((card.image.url !== null && card.image.url !== undefined)){
    imageLink = `https://api.nomoreparties.co/${card.image.url}`;
  }
  else  {
    imageLink = card.image;
  };

  function movieDuration() {
    const hours = Math.trunc(card.duration / SHORT_MOVIE_TIME_COUNT);
    const minutes = card.duration % SHORT_MOVIE_TIME_COUNT;
    return hours + 'ч' + minutes + 'м'
  };

  function handleLikeClick() {
    if(isLiked){
      appContext.savedMoviesList.forEach(element => {
        if(element.movieId === card.id) {
          deleteMovie(element._id)
        }
      });
    }
    else{
      likeMovie(card)
    }
  }

  function handleDeleteClick() {
    deleteMovie(card._id)
  }

  return(
    <li className="movie-card">
      <a
        href={card.trailerLink}
        className="movie-card__link"
        target="_blank"
        rel="noopener noreferrer">
      </a>
      <img src={imageLink} alt={card.nameRU} className="movie-card__image" />
      <div className="movie-card__container">
        <div className="movie-card__content">
          <h2 className="movie-card__title">{card.nameRU}</h2>
          <p className="movie-card__text">{movieDuration()}</p>
        </div>
        {appContext.isMovies?
          <button
            onClick={handleLikeClick}
            className={`movie-card__like-button ${isLiked&&'movie-card__like-button_active'}`}
            type='button'>
          </button>
          :
          <button
            className='movie-card__delete-button'
            type='button'
            onClick={handleDeleteClick}
          >
          </button>
        }
      </div>
    </li>
  );
};

export default MoviesCard