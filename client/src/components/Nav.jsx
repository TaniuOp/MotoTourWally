import {NavLink} from 'react-router-dom';

const Nav = () => {
    return <div className="nav">
    <ul>
      <li><NavLink to="/tourlist">TourList</NavLink></li>
      <li><NavLink to="/toptours">Top Tours</NavLink></li>
    </ul>
  </div>;
}

export default Nav