import { useCookies } from 'react-cookie';

const Userprofile = () => {
  const [cookies, setCookie] = useCookies();
  console.log(cookies);
  return (
    <div className='user'>
      <h1>User Profile</h1>
      {cookies && <p>{cookies.jwt}</p>}
    </div>
  );
};

export default Userprofile;
