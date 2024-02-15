import { useState, useEffect } from 'react';
import {   useLocation, useNavigate } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({image}) {

  const location = useLocation();
  const navigate = useNavigate();

  const [isMovie, setIsMovie] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  function searchLocation() {
    if (location.pathname === '/movies') {
      setIsMovie(true);
    }
    else {
      setIsMovie(false);
    }
  };

  useEffect(() => {
    searchLocation();
  },[navigate]);

  function handleCardLike() {
    if(isLiked) {
      setIsLiked(false);
    }
    else {
      setIsLiked(true)
    }
  }

  return(
    <li className="movie-card">
      <img src={image} alt="Обложка фильма" className="movie-card__image" />
      <div className="movie-card__container">
        <div className="movie-card__content">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__text">1ч42м</p>
        </div>
        {isMovie?
          <button
            onClick={handleCardLike}
            className={`movie-card__like-button ${isLiked&&'movie-card__like-button_active'}`}
            type='button'>
          </button>
          :
          <button
            className='movie-card__delete-button'
            type='button'>
          </button>
        }

      </div>
    </li>
  );
};

export default MoviesCard