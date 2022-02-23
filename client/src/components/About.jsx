import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>Moto Tours | Sobre nosotros</title>
      </Helmet>
      <div className='about-wrapper'>
        <main className='head-Container-about'>
          <h1 className='heading__primary about'> ¿Quienes somos?</h1>
          <h2 className='heading__secondary' id='about'>
            ¡¡¡SOLO LO MEJOR !!!!
          </h2>
        </main>

        <div className='head-Text-Container-about'>
          <p className='heading__quaternary--medium'>
            Moto Tours Wally es una empresa dedicada a organizar viajes en moto
            por el mundo. Te llevamos a los más bellos lugares para manejar moto
            y para disfrutar de los más bellos paisajes, y a los mejores
            precios. Nuestros recorridos están diseñados para el disfrute, sin
            agotar demasiado a los participantes, y siempre son visionados antes
            de ofrecerlos a nuestros clientes. Nuestra seriedad ha sido
            comprobada a través de casi 10 años de trabajo y de tantos clientes
            satisfechos. A parte de los recorridos nuestros, ofrecemos también
            recorridos personalizados para grupos de 6-8 motos.
          </p>

          <p className='heading__quaternary--medium'>
            En nuestros viajes trataremos siempre de ubicar los mejores hoteles,
            restaurantes, y opciones de diversión disponibles en la ruta para
            que el cliente se sienta satisfecho, y pueda recomendarnos entre sus
            amistades. Muchos clientes han repetido viajes con nosotros. Y eso
            es el fruto de transmitir a los participantes la pasión que sentimos
            para viajar en moto, una manera diferente y única de vivir la
            naturaleza. En la moto uno vive emociones que no siente con ningún
            medio de transporte.
          </p>
          <img
            src='http://www.mototourswally.com/wp-content/uploads/2015/04/quienes3.jpg'
            alt='Wally'
            className='about-img'
          />
          <p className='heading__quaternary--small'>
            Las motos mas utilizadas son las de la gama BMW, desde el 650 hasta
            el 1600 K 6 cilindros, hay también Ducati Multistrada, y, con
            tiempo, se pueden conseguir de otras marcas.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
