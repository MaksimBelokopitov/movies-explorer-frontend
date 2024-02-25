import './ProfileButton.css';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function ProfileButton() {

  const appContext = useContext(AppContext);

  return(
    <NavLink
      to={'/profile'}
      className={`${appContext.isPopupOpen ? 'profile-button-popup' : 'profile-button'}`}
    >
      Аккаунт
    </NavLink>
  );
};

export default ProfileButton