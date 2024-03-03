import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect } from 'react';
import { MOVIE_SEARCH_ERR, MOVIE_SEARCH_EMPTY } from '../../utils/constants';

function Movies({
  filteredList,
  movieSearch,
  likeMovie,
  deleteMovie,
  buttonMoreVisible,
  showCards,
  checkboxSearch,
  checkboxSearchOff
 }) {

  const appContext = useContext(AppContext);

  useEffect(() => {
    if(filteredList.length >0){
      appContext.setCardListVisible(true);
      appContext.setMovieEmpty(false);
    }
    if(filteredList.length === 0){
      appContext.setCardListVisible(false);
    }
      appContext.setMovieErr(false);
      appContext.restoreCheckboxStatus();
  },[filteredList])

  return(
    <main className="movies">
      <SearchForm
        movieSearch={movieSearch}
        checkboxSearch={checkboxSearch}
        checkboxSearchOff={checkboxSearchOff}
      />
      {appContext.isLoading&&<Preloader />}
      {appContext.movieEmpty&&<p className='movie__error'>{MOVIE_SEARCH_EMPTY}</p>}
      {appContext.movieErr&&<p className='movie__error'>{MOVIE_SEARCH_ERR}</p>}
      {appContext.cardListVisible&&
        <MoviesCardList
          filteredList={filteredList}
          likeMovie={likeMovie}
          deleteMovie={deleteMovie}
          buttonMoreVisible={buttonMoreVisible}
          showCards={showCards} />}
    </main>
  )
}

export default Movies