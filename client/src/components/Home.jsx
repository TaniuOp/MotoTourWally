import { useLoadedTours } from '../hooks/useLoadedTours';
import Tourcard from './Tourcard';
import { Link } from 'react-router-dom';

const Home = () => {
  const { dataTours, loading } = useLoadedTours(); //-->   // Destructuring from external hook
  //   Paint Top tours
  const paintTours = () => {
    return dataTours.map((tours, i) => <Tourcard tourInfo={tours} key={i} />);
  };
  return (
    <div className='home-Container'>
      {/* HEAD CONTENT */}
      <main className='head-Container'>
        <div className='head-Text-Container'>
          <h1 className='heading__primary'> ¡Encuentra el Tour Perfecto! </h1>
          <p className='heading__secondary'>
            En la moto no hay destino, el destino es el viaje…
          </p>
          <p className='heading__secondary'>
            4 ruedas transportan un cuerpo, 2 ruedas transportan el alma.
          </p>
          <p className='heading__secondary'>¡El mundo nos espera!</p>
          <Link to='/tourlist' className='button button--primary'>
            Ver Tours
          </Link>
        </div>
      </main>
      {/* TOP TOURS  */}
      <article className='top-Tours-Container'>
        <h3 className='heading__tertiary'>Top Tours</h3>
        <div className='nextToursList'>
          {loading && (
            <>
              <img
                className='loader'
                src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif'
                alt='Loading'
              />
            </>
          )}
          {paintTours()}
        </div>
      </article>
      {/* CONTACT */}
      <section className='contactSection'>
        <form action=''></form>
      </section>
    </div>
  );
};

export default Home;
