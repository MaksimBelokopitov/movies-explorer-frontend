import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect} from 'react';
import { MOVIE_SEARCH_EMPTY } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';


function SavedMovies({moviesList, deleteMovie, movieSearch}) {
  const appContext = useContext(AppContext);
  const isSavedMovies = true;

  useEffect(() => {
    if(appContext.isLoading){
      appContext.setSavedCardListVisible(false);
      appContext.setMovieEmpty(false);
    }
  }, [appContext.isLoading])

  useEffect(() => {
    if(moviesList.length >0){
      appContext.setSavedCardListVisible(true);
      appContext.setMovieEmpty(false);
    }
    if(moviesList.length === 0){
      appContext.setSavedCardListVisible(false);
    }
    appContext.restoreCheckBoxStatus();
  },[moviesList])


  return(
    <main className="saved-movies">
      <SearchForm movieSearch={movieSearch} isSavedMovies={isSavedMovies} />
      {appContext.isLoading&&<Preloader />}
      {appContext.movieEmpty&&<p className='movie__error'>{MOVIE_SEARCH_EMPTY}</p>}
      {appContext.savedCardListVisible&&<MoviesCardList moviesList={moviesList} deleteMovie={deleteMovie}/>}
    </main>
  )
}

export default SavedMovies