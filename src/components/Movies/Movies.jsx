import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {

  return(
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <button className='movies__button' type='button'>Еще</button>
    </main>
  )
}

export default Movies