import { Link } from 'react-router-dom';

const Tourcard = ({ tourInfo }) => {
  const { _id, tourname, imageCover, summary, price, ratingsAverage } =
    tourInfo;
  console.log(tourInfo);

  return (
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
      <p className='tourReview'>Valoración: {ratingsAverage}</p>
      <Link to={`/tourdetail/${_id}`} className='tour-link'>
        <p className='tourPrice'>Desde {price} € por persona</p>
      </Link>
    </div>
  );
};

export default Tourcard;
