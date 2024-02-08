import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { useState, useEffect } from 'react';

function AuthForm() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(false);

  function searchRegisterLocation() {
    location.pathname === '/signup'?setIsRegister(true):setIsRegister(false);
  };

  useEffect(() => {
    searchRegisterLocation();
  },[navigate]);

  return(
    <form action="submit" className="auth__form">
      <fieldset className='auth__field'>
        {isRegister&&
          <label className='auth__label' htmlFor="name">Имя
            <input
              className="auth__input"
              required
              id="name"
              name="name"
              type="text"
            />
          </label>
        }
        <label className='auth__label' htmlFor="email">E-mail
          <input
            className="auth__input"
            required
            id="email"
            name="email"
            type="e-mail"
          />
        </label>
        <label className='auth__label' htmlFor="password">Пароль
          <input
              className="auth__input"
              required
              id="password"
              name="password"
              type="password"
          />
        </label>
      </fieldset>
      <fieldset className='auth__field auth__field-button'>
        <button type="submit" className="auth__button">{isRegister?'Зарегистрироваться':'Войти'}</button>
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