import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import img1 from '../../images/card-img/img-1.png';
import img2 from '../../images/card-img/img-2.png';
import img3 from '../../images/card-img/img-3.png';
import img4 from '../../images/card-img/img-4.png';
import img5 from '../../images/card-img/img-5.png';
import img6 from '../../images/card-img/img-6.png';
import img7 from '../../images/card-img/img-7.png';
import img8 from '../../images/card-img/img-8.png';
import img9 from '../../images/card-img/img-9.png';
import img10 from '../../images/card-img/img-10.png';
import img11 from '../../images/card-img/img-11.png';
import img12 from '../../images/card-img/img-12.png';
import img13 from '../../images/card-img/img-13.png';
import img14 from '../../images/card-img/img-14.png';
import img15 from '../../images/card-img/img-15.png';
import img16 from '../../images/card-img/img-16.png';



function MoviesCardList() {

  return(
    <section className='section-movie'>
      <ul className="section-movie__list">
        <MoviesCard image={img1} />
        <MoviesCard image={img2} />
        <MoviesCard image={img3} />
        <MoviesCard image={img4} />
        <MoviesCard image={img5} />
        <MoviesCard image={img6} />
        <MoviesCard image={img7} />
        <MoviesCard image={img8} />
        <MoviesCard image={img9} />
        <MoviesCard image={img10} />
        <MoviesCard image={img11} />
        <MoviesCard image={img12} />
        <MoviesCard image={img13} />
        <MoviesCard image={img14} />
        <MoviesCard image={img15} />
        <MoviesCard image={img16} />
      </ul>
    </section>
  );
};

export default MoviesCardList