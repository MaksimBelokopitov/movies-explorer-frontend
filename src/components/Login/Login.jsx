import '../Register/Register.css';
import AuthForm from '../AuthForm/AuthForm';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import * as auth from '../../utils/MainApi';
import { regErr, regErrEmail } from '../../utils/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { authErr } from '../../utils/constants';

function Login() {
  const {
    values,
    handleChange,
    handleNameChange,
    handleEmailChange,
    errors,
    isValid,
    resetForm} = useFormAndValidation();

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const appContext = useContext(AppContext);

    const handleSubmit = (e) => {
      e.preventDefault();

      const { email, password } = values;
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
          setErrorMessage(authErr);
        }
        else{
          console.log(err);
        }
      });
    }

  return(
    <main className='register'>
      <NavLink
        to={'/'}
        className='register__logo'>
      </NavLink>
      <h2 className='register__title'>Рады видеть!</h2>
      <AuthForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleEmailChange={handleEmailChange}
        handleNameChange={handleNameChange}
        errors={errors}
        isValid={isValid}
        isError={isError}
        errorMessage={errorMessage}/>
    </main>
  );
};

export default Login
