import './AboutMe.css';
import '../Main/Main.css'
import photo from '../../images/pgoto.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {

  return(
    <section className="section section-aboutme" id="aboutMe">
      <h2 className='section__title'>Студент</h2>
      <div className="section-aboutme__container">
        <article className="section-aboutme__info">
          <div className="info__container">
            <h3 className="info__title">Максим</h3>
            <h4 className="info__subtitle">Фронтенд-разработчик, 26 лет</h4>
            <p className="section__text info__text">
              Я живу в Ставрополе.Я люблю слушать музыку,
              а ещё увлекаюсь фильмами и спортом. Недавно начал кодить.
            </p>
          </div>
          <a href="https://github.com/MaksimBelokopitov" className="section__link info__link">Github</a>
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