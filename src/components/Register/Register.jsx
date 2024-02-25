import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import * as auth from '../../utils/MainApi';
import { regErr, regErrEmail } from '../../utils/constants';
import { useState } from 'react';

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

  const handleSubmit = (e,) => {
    e.preventDefault();

    const { name, email, password } = values;
    auth.register(name, email, password)
    .then((res) => {
      setIsError(false);
      navigate('/signin', {replace: true});
    })
    .catch((err) => {
      setIsError(true);
      if(err.stutus = 409){
        setErrorMessage(regErrEmail);
      }
      else{
        setErrorMessage(regErr);
      }
    });
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