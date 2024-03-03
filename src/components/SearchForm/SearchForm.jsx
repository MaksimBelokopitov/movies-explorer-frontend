import './SearchForm.css';
import useLocalStorageState from '../../hooks/useLocalStorageState';
import { AppContext } from '../../context/AppContext';
import { useContext, useState } from 'react';
function SearchForm({
  movieSearch,
  isSavedMovies,
  checkboxSearch,
}) {

  const appContext = useContext(AppContext);
  const [searchQueryMovie, setSearchQueryMovie] = useLocalStorageState('searchQueryMovie', '');
  const [searchQueryChecked, setSearchQueryChecked] = useLocalStorageState('searchQueryChecked', false);

  // const [searchQuerySavedMovie, setSearchQuerySavedMovie] = useLocalStorageState('searchQuerySavedMovie', '');
  // const [searchQuerySavedChecked, setSearchQuerySavedChecked] = useLocalStorageState('searchQuerySavedChecked', false);


  const [searchQuerySavedMovie, setSearchQuerySavedMovie] = useState('');
  const [searchQuerySavedChecked, setSearchQuerySavedChecked] = useState(false);

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

    if(searchQueryChecked) {
      checkboxSearch({
        movie: searchQueryMovie,
        shortmovie: false
      });
      setSearchQueryChecked(false);
    }
    else {
      checkboxSearch({
        movie: searchQueryMovie,
        shortmovie: true
      });
      setSearchQueryChecked(true);

    }
  }

  function handleSavedCheckboxChange() {
    if(searchQuerySavedChecked) {
      checkboxSearch({
        movie: searchQuerySavedMovie,
        shortmovie: false
      });
     setSearchQuerySavedChecked(false);
    }
    else {
      checkboxSearch({
        movie: searchQuerySavedMovie,
        shortmovie: true
      });
      setSearchQuerySavedChecked(true);
    }
  }

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
            className={`search-form__input ${appContext.onSubmit&&'search-form__input_disabled'}`}
            type="text"
            name="movie"
            value={searchQuerySavedMovie?? ''}
            placeholder="Фильм"
            id="search-form-input"
            onChange={handleChange}
            checked={searchQuerySavedChecked}
          />
          :
          <input
            className={`search-form__input ${appContext.onSubmit&&'search-form__input_disabled'}`}
            type="text"
            name="movie"
            value={searchQueryMovie?? ''}
            placeholder="Фильм"
            id="search-form-input"
            onChange={handleChange}
            checked={searchQueryChecked}
          />
        }
        <button
          className={`search-form__button ${appContext.onSubmit&&'search-form__button_disabled'}`}
          type='submit'
          ></button>
      </fieldset>
      <fieldset className="search-form__checkbox-field">
        {isSavedMovies?
          <label className='search-form__checkbox-label'>
            <input
              className={`search-form__checkbox ${appContext.onSubmit&&'search-form__checkb0x_disabled'}`}
              type="checkbox"
              id='short-film-saved'
              name='shortmovie'
              onChange={handleSavedCheckboxChange}
            />
            <span className="search-form__slider"></span>
          </label>
          :
          <label className='search-form__checkbox-label'>
            <input
              className={`search-form__checkbox ${appContext.onSubmit&&'search-form__checkb0x_disabled'}`}
              type="checkbox"
              id='short-film'
              name='shortmovie'
              onChange={handleCheckboxChange}
            />
            <span className="search-form__slider"></span>
          </label>
        }
        <p className='search-form__text'>
          Короткометражки
        </p>
      </fieldset>
    </form>
  );
};

export default SearchForm