import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect } from 'react';
import { MOVIE_SEARCH_ERR, MOVIE_SEARCH_EMPTY } from '../../utils/constants';

function Movies({ moviesList, savedMoviesList, movieSearch, likeMovie , deleteMovie }) {
  const appContext = useContext(AppContext);
  useEffect(() => {
    if(appContext.isLoading){
      appContext.setCardListVisible(false);
      appContext.setMovieErr(false);
      appContext.setMovieEmpty(false);
    }
  }, [appContext.isLoading])

  useEffect(() => {
    if(moviesList.length >0){
      appContext.setCardListVisible(true);
      appContext.setMovieEmpty(false);
    }
    if(moviesList.length === 0){
      appContext.setCardListVisible(false);
    }
      appContext.setMovieErr(false);
      appContext.restoreCheckBoxStatus();
  },[moviesList])

  return(
    <main className="movies">
      <SearchForm  movieSearch={movieSearch}/>
      {appContext.isLoading&&<Preloader />}
      {appContext.movieEmpty&&<p className='movie__error'>{MOVIE_SEARCH_EMPTY}</p>}
      {appContext.movieErr&&<p className='movie__error'>{MOVIE_SEARCH_ERR}</p>}
      {appContext.cardListVisible&&<MoviesCardList moviesList={moviesList} savedMoviesList={savedMoviesList} likeMovie={likeMovie} deleteMovie={deleteMovie} />}
    </main>
  )
}

export default Movies