import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Userprofile = () => {
  const [cookies, setCookie] = useCookies();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserProfile = async (req, res) => {
      try {
        // if (cookies) {
        const results = await axios.get('api/v1/users/profile', {
          withCredentials: true,
          // credentials: 'include',
          //   // headers: {
          //   //   'Content-Type': 'application/json; charset=utf-8',
          //   //   'Access-Control-Allow-Credentials': true,
          //   //   Authentication: cookies.jwt,
          //   // },
        });
        // const userInfo = results;
        // setUserData(userInfo);
        console.log(results);
        // }
      } catch (e) {
        setUserData([]);
        console.log('We had an error loading the data');
      }
    };
    getUserProfile();
  }, []);

  return (
    <div className='user-profile'>
      {cookies && (
        <>
          {/* <h1 className='heading__tertiary'>{userData.username}</h1> */}
          <p>{cookies.jwt}</p>
        </>
      )}
    </div>
  );
};

export default Userprofile;
