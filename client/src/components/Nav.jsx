import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Nav = () => {
  const [cookies, setCookie] = useCookies('jwt');
  console.log(cookies);
  return (
    <div className='nav'>
      <ul>
        {cookies.jwt ? (
          <li>
            <NavLink to='/userprofile'>Profile</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to='/login'>Entrar</NavLink>
          </li>
        )}
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
