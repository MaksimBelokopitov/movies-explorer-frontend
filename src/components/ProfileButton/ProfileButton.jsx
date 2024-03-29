import './ProfileButton.css';
import { NavLink } from 'react-router-dom';

function ProfileButton({isPopupOpen}) {
  return(
    <NavLink
      to={'/profile'}
      className={`${isPopupOpen ? 'profile-button-popup' : 'profile-button'}`}
    >
      Аккаунт
    </NavLink>
  );
};

export default ProfileButton