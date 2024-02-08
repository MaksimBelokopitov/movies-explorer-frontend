import '../Register/Register.css';
import AuthForm from '../AuthForm/AuthForm';
import { NavLink } from 'react-router-dom';

function Login() {

  return(
    <main className='register'>
      <NavLink
        to={'/'}
        className={'register__logo'}>
      </NavLink>
      <h2 className={'register__title'}>Добро пожаловать!</h2>
      <AuthForm />
    </main>
  );
};

export default Login
