import { useState, useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Profile.css';

function Profile() {

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setValues({
      name: values.name,
      email: values.email});
  }, [isEdit]);

  function handleEditClick() {
    setIsEdit(true);
    const inputs = document.querySelectorAll('.form__input');
    inputs.forEach((elem)=> {
      elem.disabled=false;
    })
  };

  function handleSaveClick() {
    setIsEdit(false);
    const inputs = document.querySelectorAll('.form__input');
    inputs.forEach((elem)=> {
      elem.disabled=true;
    })
  };

  return(
    <main className="profile">
      <h2 className="profile__title">Привет, Максим!</h2>
        <form
          action="submit"
          className='profile__form'
        >
          <fieldset className='form__field'>
            <label className='form__label' htmlFor="name">Имя
              <input
                type="text"
                className={'form__input'}
                value={values.name??'Mаксим'}
                onChange={handleChange}
                disabled
                name="name"
                id="name"
                minLength={2}
                maxLength={30}
              />
              <span className={`profile__error ${!isValid && "profile__error_visible"}`}>{errors.name}</span>
            </label>
            <label className='form__label' htmlFor="email">E-mail
              <input
                type="email"
                className={'form__input'}
                value={values.email??'a@yandex.ru'}
                onChange={handleChange}
                name="email"
                id="email"
                disabled
              />
              <span className={`profile__error ${!isValid && "profile__error_visible"}`}>{errors.email}</span>
            </label>
          </fieldset>
          {isEdit?
            <button
              className={`profile__save-button ${!isValid&&'profile__save-button_disabled'}`}
              type='submit'
              onClick={handleSaveClick}
              >
                Сохранить
            </button>
          :
            <div className="profile__button-container">
              <button
                className="profile__button profile__button_edit"
                type='button'
                onClick={handleEditClick}
              >
                Редактировать
              </button>
              <button className="profile__button profile__button_exit" type='button'>Выйти из аккаунта</button>
            </div>
          }
        </form>
    </main>
  );
};

export default Profile;