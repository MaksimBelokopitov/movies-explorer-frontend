import './Profile.css';
import { useState, useContext } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AppContext } from '../../context/AppContext';



function Profile({handleProfileSubmit, signOut}) {
  const {
    values,
    setValues,
    handleNameChange,
    handleEmailChange,
    errors,
    isValid,
  } = useFormAndValidation();

  const [isEdit, setIsEdit] = useState(false);
  const curentUser = useContext(CurrentUserContext);
  const appContext = useContext(AppContext);
  const isButtonVisible = isValid.name &&isValid.email;

  function handleEditClick() {
    setIsEdit(true);
    const inputs = document.querySelectorAll('.profile__form-input');
    inputs.forEach((elem)=> {
      elem.disabled=false;
    })
  };

  function handleSubmit(e) {
    e.preventDefault();
    appContext.setIsError(false);
    if(Object.keys(values).length>0){
      handleProfileSubmit(values, e)
    }
    setValues({});
    setIsEdit(false);
    const inputs = document.querySelectorAll('.profile__form-input');
    inputs.forEach((elem)=> {
      elem.disabled=true;
    })
  };

  return(
    <main className="profile">
      <h2 className="profile__title">{`Привет, ${curentUser.name}`}</h2>
        <form
          action="submit"
          className='profile__form'
        >
          <fieldset className='profile__form-field'>
            <label className='profile__form-label' htmlFor="name">Имя
              <input
                type="text"
                className='profile__form-input'
                defaultValue={curentUser.name}
                onChange={handleNameChange}
                disabled
                name="name"
                id="name"
                minLength={2}
                maxLength={30}
                placeholder="Имя"
              />
              {!isValid.name && <span className='profile__error'>{errors.name}</span>}
            </label>
            <label className='profile__form-label' htmlFor="email">E-mail
              <input
                type="email"
                className='profile__form-input'
                defaultValue={curentUser.email}
                onChange={handleEmailChange}
                name="email"
                id="email"
                disabled
                placeholder="Email"
              />
              {!isValid.email && <span className='profile__error'>{errors.email}</span>}
            </label>
          </fieldset>
          <fieldset className='profile__form-field profile__form-field_button'>
            {appContext.isError&&<p className='profile__error-api'>{appContext.errorMessage}</p>}
            {isEdit?
              <button
                className={`profile__save-button ${!isButtonVisible&&'profile__save-button_disabled'}`}
                type='submit'
                onClick={handleSubmit}
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
                <button
                  className="profile__button profile__button_exit"
                  type='button'
                  onClick={signOut}>Выйти из аккаунта</button>
              </div>
            }
          </fieldset>
        </form>
    </main>
  );
};

export default Profile;