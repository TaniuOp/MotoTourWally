import { useEffect, useState } from 'react';
import { getTopTours } from '../helpers/getTopTours';

export const useTopLoadedTours = () => {
  const [toursData, setToursData] = useState({
    dataTours: [],
    loading: true,
  });
  //-->  // Migrated obtain the fetch petition from the helper file
  useEffect(() => {
    getTopTours().then((tours) =>
      setToursData({
        dataTours: tours,
        loading: false,
      })
    );
  }, []);
  console.log(toursData);

  return toursData; // --> retorna {data de [tours] y loader: Boolean}
};
