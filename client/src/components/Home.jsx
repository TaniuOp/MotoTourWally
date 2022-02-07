import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='homeMainContainer'>
      {/* HEAD CONTENT */}
      <main className='headContainer'>
        <div className='headTextContainer'>
          <h1 className='maintitle'> ¡Encuentra el Tour Perfecto! </h1>
          <p className='mainParagraph'>
            En la moto no hay destino, el destino es el viaje…
          </p>
          <p className='mainParagraph'>
            4 ruedas transportan un cuerpo, 2 ruedas transportan el alma.
          </p>
          <p className='mainParagraph'>¡El mundo nos espera!</p>
          <Link to='/tourlist' className='toursPrimary'>
            Ver Tours
          </Link>
        </div>
      </main>
      {/* TOP TOURS  */}
      <article className='nextToursContainer'>
        <h2>Top Tours</h2>
        <div className='nextToursList'>
          <div className='tourCard'>
            <h2 className='tourTitle'>Tour Name</h2>
            <img
              className='tourImg'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Motorcycle_icon.svg/600px-Motorcycle_icon.svg.png'
              alt='Tour image'
            />
            <p className='tourDescription'>Lorem ipsum</p>
            <p className='tourPrice'>Desde 0 € por persona</p>
          </div>
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
