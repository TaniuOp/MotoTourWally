import axios from 'axios';

export const getTopTours = async () => {
  const url = '/api/v1/tours/toptours';
  const results = await axios.get(url);

  return results.data.data.tours;
};
