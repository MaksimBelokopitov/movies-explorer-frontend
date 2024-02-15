import './NavTab.css';


function NavTab() {
  return(
    <section className="section-navtab">
      <nav className="section-navtab__nav">
        <ul className="section-navtab__nav-list">
          <li className="section-navtab__nav-item">
            <a href="#about" className="section-navtab__nav-link">О проекте</a>
          </li>
          <li className="section-navtab__nav-item">
            <a href="#tech" className="section-navtab__nav-link">Технологии</a>
          </li>
          <li className="section-navtab__nav-item">
            <a href="#aboutMe" className="section-navtab__nav-link">Студент</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab