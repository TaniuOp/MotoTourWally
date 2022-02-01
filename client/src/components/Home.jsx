import {Link} from 'react-router-dom';

const Home = () => {
  return <div>
    <h1 className="title">Bienvenido a MOTO TOUR WALLY </h1>
    <div className="linkContainer">
      <Link to="/tourlist" className="primary">Ver Tours</Link>
    </div>
  </div>;
};

export default Home;