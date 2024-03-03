import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect} from 'react';
import { MOVIE_SEARCH_EMPTY } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  filteredList,
  movieSearch,
  deleteMovie,
  showCards,
  checkboxSearch,
  checkboxSearchOff}) {

  const appContext = useContext(AppContext);
  const isSavedMovies = true;

  useEffect(() => {
    appContext.setFilteredSavedMovies(appContext.savedMoviesList)
},[])

  useEffect(() => {
      if(filteredList.length >0){
        appContext.setCardListVisible(true);
        appContext.setMovieEmpty(false);
      };

      if(filteredList.length === 0){
        appContext.setCardListVisible(false);
      };
  },[ filteredList])

  return(
    <main className="saved-movies">
      <SearchForm
        movieSearch={movieSearch}
        isSavedMovies={isSavedMovies}
        checkboxSearch={checkboxSearch}
        checkboxSearchOff={checkboxSearchOff} />
      {appContext.isLoading&&<Preloader />}
      {appContext.movieEmpty&&<p className='movie__error'>{MOVIE_SEARCH_EMPTY}</p>}
      {appContext.cardListVisible&&
        <MoviesCardList
          deleteMovie={deleteMovie}
          filteredList={filteredList}
          showCards={showCards}/>}
    </main>
  )
}

export default SavedMovies