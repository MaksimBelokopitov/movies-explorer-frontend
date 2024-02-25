import './SearchForm.css';
import useLocalStorageState from '../../hooks/useLocalStorageState';

function SearchForm({ movieSearch, isSavedMovies}) {

  const [searchQueryMovie, setSearchQueryMovie] = useLocalStorageState('searchQueryMovie', '');
  const [searchQueryChecked, setSearchQueryChecked] = useLocalStorageState('searchQueryChecked', false);

  const [searchQuerySavedMovie, setSearchQuerySavedMovie] = useLocalStorageState('searchQuerySavedMovie', '');
  const [searchQuerySavedChecked, setSearchQuerySavedChecked] = useLocalStorageState('searchQueryChecked', false);

  const handleChange = (e) => {
    const {value} = e.target
    if(!isSavedMovies){
      setSearchQueryMovie( value );
    }
    else{
      setSearchQuerySavedMovie( value );
    }
  };

  function handleCheckboxChange() {

    if(!isSavedMovies){
      if(searchQueryChecked) {
        setSearchQueryChecked(false);
      }
      else {
        setSearchQueryChecked(true);
      }
    }
    else{
      if(searchQueryChecked) {
        setSearchQuerySavedChecked(false);
      }
      else {
        setSearchQuerySavedChecked(true);
      }
    };
  };

  function handleSubmit(e) {
    e.preventDefault();
    if(!isSavedMovies){
      movieSearch({
        movie: searchQueryMovie,
        shortmovie: searchQueryChecked,
      })
    }
    else{
      movieSearch({
        movie: searchQuerySavedMovie,
        shortmovie: searchQuerySavedChecked,
      })
    };
  };

  return(
    <form
      className="search-form"
      action="submit"
      name='movie-search'
      onSubmit={handleSubmit}
      >
      <fieldset className="search-form__field">
        {isSavedMovies?
          <input
            className="search-form__input"
            type="text"
            name="movie"
            value={searchQuerySavedMovie?? ''}
            placeholder="Фильм"
            id="search-form-input"
            onChange={handleChange}
          />
          :
          <input
            className="search-form__input"
            type="text"
            name="movie"
            value={searchQueryMovie?? ''}
            placeholder="Фильм"
            id="search-form-input"
            onChange={handleChange}
          />
        }
        <button className="search-form__button" type='submit'></button>
      </fieldset>
      <fieldset className="search-form__checkbox-field">
        <label className='search-form__checkbox-label'>
          <input
            className='search-form__checkbox'
            type="checkbox"
            id='short-film'
            name='shortmovie'
            onChange={handleCheckboxChange}
          />
          <span className="search-form__slider"></span>
        </label>
        <p className='search-form__text'>
          Короткометражки
        </p>
      </fieldset>
    </form>
  );
};

export default SearchForm