import { Link } from 'react-router-dom';

const Tourcard = ({ tourInfo }) => {
  const { _id, tourname, imageCover, summary, price, ratingsAverage } =
    tourInfo;

  return (
    <Link to={`/tourdetail/${_id}`} className='tour-link'>
      <div className='tourCard'>
        <h2 className='tourTitle'>{tourname}</h2>
        {imageCover ? (
          <img className='tourImg' src={imageCover} alt={tourname} />
        ) : (
          <img
            className='tourImg'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Motorcycle_icon.svg/600px-Motorcycle_icon.svg.png'
            alt={tourname}
          />
        )}
        <p className='tourDescription'>{summary}</p>
        <p className='tourPrice'>Desde {price} € por persona</p>
        <p className='tourReview'>Valoración: {ratingsAverage}</p>
      </div>
    </Link>
  );
};

export default Tourcard;
