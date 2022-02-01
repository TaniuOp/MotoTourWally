import { Routes, Route } from 'react-router-dom';
import Tourlist from './Tourlist';
import Toptours from './Toptours'
import Home from './Home';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {

  const [tours, setTours] = useState([]);


  useEffect(() => {
    const getTours = async () => {
      const myApiUrl = '/api/v1/tours'
      const requestTours = await axios.get(myApiUrl)
      setTours(requestTours.data.data.tours)
    }
    getTours()
  }, [])
  
  console.log(tours);

  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/tourlist' element={<Tourlist />} />
    <Route path='/toptours' element={<Toptours />} />
  </Routes>;
};

export default Main;
