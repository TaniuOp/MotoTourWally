import { useTopLoadedTours } from '../hooks/useTopLoadedTours';
import Tourcard from './Tourcard';

const Toptours = () => {
  const { dataTours, loading } = useTopLoadedTours(); //-->   // Destructuring from external hook

  //   Paint Top tours
  const paintTours = () => {
    return dataTours.map((tours, i) => <Tourcard tourInfo={tours} key={i} />);
  };

  return (
    <article className='top-Tours-Container'>
      <h3 className='heading__tertiary titles'>Top Tours</h3>
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
  );
};

export default Toptours;
