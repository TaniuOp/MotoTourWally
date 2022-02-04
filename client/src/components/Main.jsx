import { Routes, Route } from 'react-router-dom';
import Tourlist from './Tourlist';
import Toptours from './Toptours';
import Home from './Home';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tourlist' element={<Tourlist />} />
      <Route path='/toptours' element={<Toptours />} />
    </Routes>
  );
};

export default Main;
