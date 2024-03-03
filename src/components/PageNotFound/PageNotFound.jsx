import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigation = useNavigate();
  return(
    <div className="page-error">
      <h2 className="page-error__title">404</h2>
      <p className="page-error__text">Страница не найдена</p>
      <button
        className="page-error__button"
        onClick={() => navigation(-1)}>Назад</button>
    </div>
  );
};

export default PageNotFound