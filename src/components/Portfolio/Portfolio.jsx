import './Portfolio.css';
import '../Main/Main.css';

function Portfolio() {
  return(
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="section-list portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/MaksimBelokopitov/how-to-learn"
            className="section-link portfolio__link"
            target="_blank"
            rel="noopener noreferrer">
              Статичный сайт
            </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/MaksimBelokopitov/russian-travel"
            className="section-link portfolio__link"
            target="_blank"
            rel="noopener noreferrer">
              Адаптивный сайт
            </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/MaksimBelokopitov/react-mesto-api-full-gha"
            className="section-link portfolio__link"
            target="_blank"
            rel="noopener noreferrer">
              Одностраничное приложение
            </a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio