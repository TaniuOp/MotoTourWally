import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div className='tour-detail'>
          <img src={tourData.imageCover} alt={tourData.tourname} />
          <h1>Tour {tourData.tourname} </h1>
          <>
            {tourData.images
              ? tourData.images.map((e, i) => <img src={e} key={i} />)
              : null}
          </>
          <ul>
            {tourData.startDates
              ? tourData.startDates.map((e, i) => <li key={i}>{e}</li>)
              : null}
          </ul>
        </div>
      )}
    </>
  );
};

export default Tourdetail;
