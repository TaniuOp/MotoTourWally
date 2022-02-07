import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='nav'>
      <ul>
        <li>
          <NavLink to='/tourlist'>Nuestros Tour</NavLink>
        </li>
        <li>
          <NavLink to='/about'>Sobre Nosotros</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
