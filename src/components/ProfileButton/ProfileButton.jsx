import './ProfileButton.css';

function ProfileButton({isPopupOpen}) {
  return(
    <button className={`${isPopupOpen ? 'profile-button_popup' : 'profile-button'}`}>Аккаунт</button>
  );
};

export default ProfileButton