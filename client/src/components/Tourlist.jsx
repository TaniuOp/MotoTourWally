import { useLoadedTours } from '../hooks/useLoadedTours';
import { Helmet } from 'react-helmet';

import Tourcard from './Tourcard';

const Tourlist = () => {
  const { dataTours, loading } = useLoadedTours(); //-->   // Destructuring from external hook

  //   Paint tours
  const paintTours = () => {
    return dataTours.map((tours, i) => <Tourcard tourInfo={tours} key={i} />);
  };

  return (
    <>
      <Helmet>
        <title>Moto Tours | Nuestros Tours </title>
      </Helmet>
      <div className='cardContainer'>
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
    </>
  );
};

export default Tourlist;
