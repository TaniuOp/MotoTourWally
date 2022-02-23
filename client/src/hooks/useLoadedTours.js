import { useEffect, useState } from 'react';
import { getTours, getTopTours } from '../helpers/getTours';

export const useLoadedTours = () => {
  const [toursData, setToursData] = useState({
    dataTours: [],
    loading: true,
  });
  //-->  // Migrated obtain the fetch petition from the helper file
  useEffect(() => {
    getTours().then((tours) =>
      setToursData({
        dataTours: tours,
        loading: false,
      })
    );
  }, []);

  return toursData; // --> retorna {data de [tours] y loader: Boolean}
};
