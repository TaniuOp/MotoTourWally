import { useLoadedTours } from '../hooks/useLoadedTours';
import Tourcard from './Tourcard';

const Tourlist = () => {
  const { dataTours, loading } = useLoadedTours(); //-->   // Destructuring from external hook

  //   Paint tours
  const paintTours = () => {
    return dataTours.map((tours, i) => <Tourcard tourInfo={tours} key={i} />);
  };

  return (
    <div>
      {loading && 'Cargando...'}
      {paintTours()}
    </div>
  );
};

export default Tourlist;
