import './PageNotFound.css';
import { NavLink } from 'react-router-dom';

function PageNotFound() {

  return(
    <div className="page-error">
      <h2 className="page-error__title">404</h2>
      <p className="page-error__text">Страница не найдена</p>
      <NavLink
        to={'/'}
        className={"page-error__link"}>Назад</NavLink>
    </div>
  );
};

export default PageNotFound