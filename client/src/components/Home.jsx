import Contact from './Contact';
import Toptours from './Toptours';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-Container'>
      {/* HEAD CONTENT */}
      <main className='head-Container'>
        <div className='head-Text-Container'>
          <h1 className='heading__primary'> ¡Encuentra el Tour Perfecto! </h1>
          <p className='heading__secondary home-text'>
            En la moto no hay destino, el destino es el viaje…
          </p>
          <p className='heading__secondary home-text'>
            4 ruedas transportan un cuerpo, 2 ruedas transportan el alma.
          </p>
          <p className='heading__secondary home-text'>¡El mundo nos espera!</p>
          <Link to='/tourlist' className='button button--secondary'>
            Ver Tours
          </Link>
        </div>
      </main>
      {/* TOP TOURS  */}
      <article className='top-Tours-Container'>
        <h3 className='heading__tertiary'>Top Tours</h3>
        <Toptours />
      </article>
      {/* CONTACT */}
      <section className='contact-Container'>
        <h3 className='heading__tertiary'>Contacta con nosotros</h3>
        <Contact />
      </section>
    </div>
  );
};

export default Home;
