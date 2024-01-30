import './Techs.css';
import '../Main/Main.css';

function Techs() {

  return(
    <section className="section section-techs" id="tech">
      <h2 className="section__title">Технологии</h2>
      <div className="section-techs__container">
        <h3 className="section-techs__subtitle">7 технологий</h3>
        <p className=" section__text section-techs__text">
          На курсе веб-разработки мы освоили технологии, которые
          применили в дипломном проекте.
        </p>
        <ul className="section__list section-techs__list">
          <li className="section__text section-techs__item">HTML</li>
          <li className="section__text section-techs__item">CSS</li>
          <li className="section__text section-techs__item">JS</li>
          <li className="section__text section-techs__item">React</li>
          <li className="section__text section-techs__item">Git</li>
          <li className="section__text section-techs__item">Express.js</li>
          <li className="section__text section-techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
};

export default Techs