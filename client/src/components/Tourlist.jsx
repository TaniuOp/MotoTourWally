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
            <iframe
              src='https://gfycat.com/ifr/AggravatingSilentChimneyswift'
              frameborder='0'
              scrolling='no'
              allowfullscreen
              width='640'
              height='524'
            ></iframe>
          </>
        )}
        {paintTours()}
      </div>
    </>
  );
};

export default Tourlist;
