import { Routes, Route } from 'react-router-dom';
import Tourlist from './Tourlist';
import About from './About';
import Home from './Home';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tourlist' element={<Tourlist />} />
      <Route path='/about' element={<About />} />
    </Routes>
  );
};

export default Main;
