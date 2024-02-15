import './SearchForm.css';

function SearchForm() {

  return(
    <form className="search-form" action="submit">
      <fieldset className="search-form__field">
        <input
          className="search-form__input"
          type="text"
          name="movie"
          placeholder="Фильм"
          id="search-form-input"
        />
        <button className="search-form__button" type='submit'></button>
      </fieldset>
      <fieldset className="search-form__checkbox-field">
        <label className='search-form__checkbox-label'>
          <input
            className='search-form__checkbox'
            type="checkbox"
            id='short-film'
          />
          <span className="search-form__slider"></span>
        </label>
        <p className='search-form__text'>
          Короткометражки
        </p>
      </fieldset>
    </form>

  )
}

export default SearchForm