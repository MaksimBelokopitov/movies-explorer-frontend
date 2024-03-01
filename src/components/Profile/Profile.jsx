import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AppContext } from '../../context/AppContext';

function Profile({handleProfileSubmit, signOut, profileChangeOk, setProfileChangeOk}) {
  const {
    values,
    setValues,
    isNewData,
    handleNameChange,
    handleEmailChange,
    errors,
    isValid,
  } = useFormAndValidation();

  const [isEdit, setIsEdit] = useState(false);
  const curentUser = useContext(CurrentUserContext);
  const appContext = useContext(AppContext);
  const [inputsIsValid, setInputsIsValid] = useState(false);
  const inputs = document.querySelectorAll('.profile__form-input');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {

    if(isValid.name){
      setIsValidName(true);
    }
    else{
      setIsValidName(false);
    };

    if(isValid.email){
      console.log('a');
      setIsValidEmail(true);
    }
    else{
      console.log('s');
      setIsValidEmail(false);
    };

    if(isNewData.name&&isValid.name||isNewData.email&&isValid.email) {
      setInputsIsValid(true)
    }
    else{
      setInputsIsValid(false)
    }
  },[values])

  function handleEditClick() {
    appContext.setIsError(false)
    setProfileChangeOk(false);
    setIsEdit(true);
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
                className={`profile__form-input ${appContext.onSubmit&&'profile__form-input_disabled'}`}
                defaultValue={curentUser.name}
                onChange={handleNameChange}
                disabled
                name="name"
                id="name"
                minLength={2}
                maxLength={30}
                placeholder="Имя"
              />
              {!isValidName && <span className='profile__error'>{errors.name}</span>}
            </label>
            <label className='profile__form-label' htmlFor="email">E-mail
              <input
                type="email"
                className={`profile__form-input ${appContext.onSubmit&&'profile__form-input_disabled'}`}
                defaultValue={curentUser.email}
                onChange={handleEmailChange}
                name="email"
                id="email"
                disabled
                placeholder="Email"
              />
              {!isValidEmail && <span className='profile__error'>{errors.email}</span>}
            </label>
          </fieldset>
          <fieldset className='profile__form-field profile__form-field_button'>
            {profileChangeOk&&<p className='profile__change-ok'>Данные пользователя успешно изменены</p>}
            {appContext.isError&&<p className='profile__error-api'>{appContext.errorMessage}</p>}
            {isEdit?
              <button
                className={`profile__save-button ${!inputsIsValid&&'profile__save-button_disabled'} ${appContext.onSubmit&&'profile__save-button_disabled'}`}
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