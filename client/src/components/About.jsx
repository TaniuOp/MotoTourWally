import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>Moto Tours | Sobre nosotros</title>
      </Helmet>
      <div className='wrapper'>
        <aside className='aboutUsImg'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/mototour-e35c7.appspot.com/o/127.jpeg?alt=media&token=ee1c883c-f4c0-4661-92eb-9401e47f7c9d'
            alt=''
            srcset=''
          />
        </aside>
        <main className='aboutUs'>
          <h1>Sobre nosotros</h1>
          <h2>JUST THE BEST !!!! SOLO LO MEJOR !!!!</h2>
        </main>
        <p className='aboutUsTextOne'>
          Moto Tours Wally es una empresa dedicada a organizar viajes en moto
          por el mundo. Te llevamos a los más bellos lugares para manejar moto y
          para disfrutar de los más bellos paisajes, y a los mejores precios.
          Nuestros recorridos están diseñados para el disfrute, sin agotar
          demasiado a los participantes, y siempre son visionados antes de
          ofrecerlos a nuestros clientes. Nuestra seriedad ha sido comprobada a
          través de casi 10 años de trabajo y de tantos clientes satisfechos. A
          parte de los recorridos nuestros, ofrecemos también recorridos
          personalizados para grupos de 6-8 motos.
        </p>
        <p className='aboutUsTextTwo'>
          En nuestros viajes trataremos siempre de ubicar los mejores hoteles,
          restaurantes, y opciones de diversión disponibles en la ruta para que
          el cliente se sienta satisfecho, y pueda recomendarnos entre sus
          amistades. Creo que esa es la mejor publicidad que podamos tener, y
          eso ha funcionado plenamente hasta ahora. Al igual que muchos clientes
          han repetido viajes con nosotros. Y eso es el fruto de transmitir a
          los participantes la pasión que sentimos para viajar en moto, una
          manera diferente y única de vivir la naturaleza. En la moto uno vive
          emociones que no siente con ningún medio de transporte.
        </p>
        <p className='aboutUsTextThree'>
          En la moto no hay destino, el destino es el viaje…4 ruedas transportan
          un cuerpo, 2 ruedas transportan el alma. Esas son, en mi opinión,
          aseveraciones que dan la idea de lo que es viajar en moto…..El mundo
          nos espera…
        </p>
        <p className='aboutUsTextFour'>
          Normalmente las motos mas utilizadas son las de la gama Bmw, desde el
          650 hasta el 1600 K 6 cilindros, hay también Ducati Multistrada, y,
          con tiempo, se pueden conseguir de otras marcas.
        </p>
      </div>
    </>
  );
};

export default About;
