import './AboutMe.css';
import '../Main/Main.css'
import photo from '../../images/pgoto.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {

  return(
    <section className="section section-aboutme" id="aboutMe">
      <h2 className='section-title'>Студент</h2>
      <div className="section-aboutme__container">
        <article className="section-aboutme__info">
          <div className="section-aboutme__info-container">
            <h3 className="section-aboutme__info-title">Максим</h3>
            <h4 className="section-aboutme__info-subtitle">Фронтенд-разработчик, 26 лет</h4>
            <p className="section-text section-aboutme__info-text">
              Я живу в Ставрополе.Я люблю слушать музыку,
              а ещё увлекаюсь фильмами и спортом. Недавно начал кодить.
            </p>
          </div>
          <a
            href="https://github.com/MaksimBelokopitov"
            target="_blank"
            rel="noopener noreferrer"
            className="section-link section-aboutme__info-link">
              Github
          </a>
        </article>
        <article className="section-aboutme__photo-container">
          <img src={photo} alt="Мое фото" className="section-aboutme__photo" />
        </article>
      </div>
      <Portfolio />
    </section>
  )
}

export default AboutMe