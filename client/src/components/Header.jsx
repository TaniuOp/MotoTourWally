import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img
          src='https://firebasestorage.googleapis.com/v0/b/mototour-e35c7.appspot.com/o/Wlimpio2.png?alt=media&token=f6518be6-2691-4e5a-983f-0eaec98889f0'
          alt='logo'
          className='logoHeader'
        />
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
