import './AboutProject.css';
import '../Main/Main.css';

function AboutProject() {
  return(
    <section className="section section-about" id="about">
      <h2 className="section-title">О проекте</h2>
      <div className="section-about__paragraph">
        <article className='section-about__article'>
          <h3 className="section-about__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="section-text section-about__text">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className='section-about__article'>
          <h3 className="section-about__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="section-text section-about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="section-about__graph">
        <div className="section-about__graph-back">
          <p className="section-about__graph-weeks section-about__graph-weeks_back">1 неделя</p>
          <p className="section-about__graph-name">Back-end</p>
        </div>
        <div className="section-about__graph-front">
          <p className="section-about__graph-weeks section-about__graph-weeks_front">4 недели</p>
          <p className="section-about__graph-name">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject