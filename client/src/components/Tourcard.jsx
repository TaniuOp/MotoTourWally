const Tourcard = ({ tourInfo }) => {
  const { name, imageCover, summary } = tourInfo;

  console.log(tourInfo);
  return (
    <div className='card__container'>
      <h2 className='card__tile'>{name}</h2>
      <img className='card__img' src={imageCover} alt='' />
      <p className='card__text'>{summary}</p>
    </div>
  );
};

export default Tourcard;
