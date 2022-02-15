import { Routes, Route } from 'react-router-dom';
import Tourlist from './Tourlist';
import About from './About';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Userprofile from './Userprofile';
import Tourdetail from './Tourdetail';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tourlist' element={<Tourlist />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/userprofile' element={<Userprofile />} />
      <Route path='/tourdetail/:tour_id' element={<Tourdetail />} />
    </Routes>
  );
};

export default Main;
