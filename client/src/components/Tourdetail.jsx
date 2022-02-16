import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import Carousel from 'flat-carousel';
import Carousel from 'framer-motion-carousel';

const Tourdetail = () => {
  const { tour_id } = useParams(); //-> ID from the url
  const [tourData, setTourData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTourDetail = async () => {
      try {
        const results = await axios.get(`/api/v1/tours/${tour_id}`);
        const tourObj = results.data.data.tour;
        setTourData(tourObj);
        setLoading(false);
      } catch (e) {
        setTourData([]);
        console.log('We had an error loading the data');
      }
    };
    loadTourDetail();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <img
            className='loader'
            src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif'
            alt='Loading'
          />
        </>
      ) : (
        <div className='tour-main-container'>
          <div className='tour-head-container'>
            <img
              src={tourData.imageCover}
              alt={tourData.tourname}
              className='tour-detail-img'
            />
            <div className='tour-detail-info'>
              <p className='tour-detail-rating heading__secondary'>
                Valoraxción: {tourData.ratingsAverage}/5
              </p>
              <h1 className='tour-detail-name heading__primary'>
                Tour {tourData.tourname}{' '}
              </h1>
              <p className='tour-detail-difficulty heading__secondary '>
                Dificultad: {tourData.difficulty}
              </p>
            </div>
          </div>
          <div className='tour-detail-moreinfo'>
            <p className='tour-detail-description  heading__quaternary '>
              {tourData.description}
            </p>
            <ul className='tour-detail-dates'>
              <h2 className='heading__tertiary'>Fechas</h2>
              {tourData.startDates
                ? tourData.startDates.map((e, i) => <li key={i}>{e}</li>)
                : null}
            </ul>
          </div>
          <p className='tour-detail-price heading__tertiary'>
            Desde {tourData.price} € por persona
          </p>
          <p className='tour-detail-group heading__tertiary'>
            Grupos minimo de : {tourData.maxGroupSize} personas
          </p>
          <div className='tour-detail-images'>
            {tourData.images ? (
              <Carousel>
                {tourData.images.map((e, i) => (
                  <img src={e} key={i} className='tour-image' />
                ))}
              </Carousel>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Tourdetail;
