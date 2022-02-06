import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='homeMainContainer'>
      <main className='headContainer'>
        <h1 className='maintitle'> ¡Encuentra el Tour Perfecto! </h1>
        <p className='mainParagraph'>
          En la moto no hay destino, el destino es el viaje…
        </p>
        <p className='mainParagraph'>
          4 ruedas transportan un cuerpo, 2 ruedas transportan el alma.
        </p>
        <p className='mainParagraph'>
          Esas son, en nuestra opinión, aseveraciones que dan la idea de lo que
          es viajar en moto…El mundo nos espera…
        </p>
        <Link to='/tourlist' className='toursPrimary'>
          Ver Tours
        </Link>
      </main>
      <div className='linkContainer'></div>
    </div>
  );
};

export default Home;
