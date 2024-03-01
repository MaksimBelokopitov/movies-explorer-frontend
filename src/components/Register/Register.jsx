import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import * as auth from '../../utils/MainApi';
import { REG_ERR, REG_EMAIL_ERR, AUTH_ERR} from '../../utils/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

function Register() {
  const {
    values,
    handleChange,
    handleNameChange,
    handleEmailChange,
    errors,
    isValid,
    } = useFormAndValidation();

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const appContext = useContext(AppContext);

  const handleSubmit = (e,) => {
    e.preventDefault();
    appContext.setOnSubmit(true);
    const { name, email, password } = values;
    auth.register(name, email, password)
      .then((res) => {
        setIsError(false);
        auth.authorize(email, password)
          .then((data) => {
            setIsError(false);
            if(data){
              appContext.setIsLogin(true);
              navigate('/movies', {replace: true});
            }
          })
          .catch((err) => {
            setIsError(true);
            if(err.stutus = 401){
              setErrorMessage(AUTH_ERR);
            }
            else{
              console.log(err);
            }
          });
      })
      .catch((err) => {
        setIsError(true);
        if(err.stutus = 409){
          setErrorMessage(REG_EMAIL_ERR);
        }
        else{
          setErrorMessage(REG_ERR);
        }
      })
      .finally(() => {
        appContext.setOnSubmit(false);
      })
  }

  return(
    <main className='register'>
      <NavLink
        to={'/'}
        className={'register__logo'}>
      </NavLink>
      <h2 className={'register__title'}>Добро пожаловать!</h2>
      <AuthForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleEmailChange={handleEmailChange}
        handleNameChange={handleNameChange}
        errors={errors}
        isValid={isValid}
        isError={isError}
        errorMessage={errorMessage} />
    </main>
  );
};

export default Register