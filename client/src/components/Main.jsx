import { Routes, Route } from 'react-router-dom';
import Tourlist from './Tourlist';
import Toptours from './Toptours';
import About from './About';
import Home from './Home';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tourlist' element={<Tourlist />} />
      <Route path='/toptours' element={<Toptours />} />
      <Route path='/about' element={<About />} />
    </Routes>
  );
};

export default Main;
