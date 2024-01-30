import './Portfolio.css';
import '../Main/Main.css';

function Portfolio() {
  return(
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="section__list portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/MaksimBelokopitov/how-to-learn" className="section__link portfolio__link">Статичный сайт</a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/MaksimBelokopitov/russian-travel" className="section__link portfolio__link">Адаптивный сайт</a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/MaksimBelokopitov/react-mesto-api-full-gha" className="section__link portfolio__link">Одностраничное приложение</a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio