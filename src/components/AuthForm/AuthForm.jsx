import './AuthForm.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function AuthForm({
  handleSubmit,
  handleChange,
  handleEmailChange,
  handleNameChange,
  errors,
  isValid,
  isError,
  errorMessage}) {


  const navigate = useNavigate();
  const location = useLocation();
  const RegButtonVisible = isValid.name &&isValid.email &&isValid.password;
  const AuthButtonVisible = isValid.email &&isValid.password;
  const appContext = useContext(AppContext);

  const [isRegister, setIsRegister] = useState(false);

  function searchRegisterLocation() {
    location.pathname === '/signup'?setIsRegister(true):setIsRegister(false);
  };

  useEffect(() => {
    searchRegisterLocation();
  },[navigate]);

  return(
    <form
      action="submit"
      className="auth"
      onSubmit={handleSubmit}>
      <fieldset className='auth__field'>
        {isRegister&&
          <label className='auth__label' htmlFor="name">Имя
            <input
              className={`auth__input ${appContext.onSubmit&&'auth__input_disabled'}`}
              required
              id="name"
              name="name"
              type="text"
              placeholder="Имя"
              onChange={handleNameChange}
            />
           {!isValid.name&&<span className="auth__error">{errors.name}</span>}
          </label>
        }
        <label className='auth__label' htmlFor="email">E-mail
          <input
            className={`auth__input ${appContext.onSubmit&&'auth__input_disabled'}`}
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
           {!isValid.email&&<span className="auth__error">{errors.email}</span>}
        </label>
        <label className='auth__label' htmlFor="password">Пароль
          <input
              className={`auth__input ${appContext.onSubmit&&'auth__input_disabled'}`}
              required
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChange}

          />
          {!isValid.password&&<span className='auth__error'>{errors.password}</span>}
        </label>
      </fieldset>
      <fieldset className='auth__field auth__field-button'>
      {isError&&<p className='auth__error-api'>{errorMessage}</p>}
      {isRegister?
        <button
          type="submit"
          className={RegButtonVisible && !appContext.onSubmit ? 'auth__button':'auth__button_disabled'}
        >
          Зарегистрироваться
        </button>
        :
        <button
          type="submit"
          className={AuthButtonVisible && !appContext.onSubmit ? 'auth__button':'auth__button_disabled'}
        >
          Войти
        </button>
      }
        {isRegister?
          <p className='auth__subtitle'>Уже зарегистрированы?
            <NavLink to="/signin" className="auth__link">
              Войти
            </NavLink>
          </p>
          :
          <p className='auth__subtitle'>Еще не зарегистрированы?
            <NavLink to="/signup" className="auth__link">
              Регистрация
            </NavLink>
          </p>
        }
      </fieldset>
    </form>
  );
};

export default AuthForm