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
    <li className="section-movie__item">
      <img src={image} alt="Обложка фильма" className="section-movie__image" />
      <div className="section-movie__container">
        <div className="section-movie__content">
          <h2 className="section-movie__title">33 слова о дизайне</h2>
          <p className="section-movie__text">1ч42м</p>
        </div>
        {isMovie?
          <button
            onClick={handleCardLike}
            className={`section-movie__like-button ${isLiked&&'section-movie__like-button_active'}`}
            type='button'>
          </button>
          :
          <button
            className={'section-movie__delete-button'}
            type='button'>
          </button>
        }

      </div>
    </li>
  );
};

export default MoviesCard