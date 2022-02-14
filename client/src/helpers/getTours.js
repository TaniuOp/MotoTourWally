import axios from 'axios';

export const getTours = async () => {
  const url = '/api/v1/tours?page=1&sort=price';
  const results = await axios.get(url);

  return results.data.data.tours; // Return the tours Array
};

export const getTopTours = async () => {
  const url = '/api/v1/tours/toptours';
  const results = await axios.get(url);

  return results.data.data.tours;
};
