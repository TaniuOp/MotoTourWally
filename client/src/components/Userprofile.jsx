import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';

const Userprofile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [userData, setUserData] = useState({});
  const [newsletterState, setNewsletter] = useState(true);
  let navigate = useNavigate(); //Once loged in redirect to

  useEffect(() => {
    const getUserProfile = async (req, res) => {
      try {
        if (cookies) {
          const result = await axios.get('api/v1/users/profile', {
            withCredentials: true,
          });
          const userObj = result.data.data.currentUser;
          setUserData(userObj);
          console.log(userObj);
          setNewsletter(userObj.newsletter);
        }
      } catch (e) {
        setUserData([]);
        console.log('We had an error loading the data');
      }
    };
    getUserProfile();
    console.log(userData);
  }, []);

  const handleNewsletter = async () => {
    setNewsletter(!newsletterState);
    try {
      console.log(newsletterState);
      const body = { newsletter: newsletterState };
      await axios.patch('api/v1/users/edit-profile', body, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = () => {
    removeCookie('jwt');
    navigate('/');
  };

  return (
    <div className='user-profile'>
      {userData && (
        <>
          <div className='profile-wrapper'>
            <div className='head-Container-profile'>
              <img
                src={userData.photo}
                alt={userData._id}
                className='profile-img'
              />
            </div>
            <div className='head-Text-Container-profile'>
              <h1 className='heading__tertiary'>{userData.username}</h1>
              <h2 className='heading__quaternary'>{userData.email}</h2>
              <p className='heading__quaternary--medium'>{userData.userRole}</p>
              <p className='heading__quaternary--medium'>
                Apuntarse a nuestra newsletter
              </p>
              <label>
                <Switch onChange={handleNewsletter} checked={newsletterState} />
              </label>
            </div>
          </div>
          <div className='logout-btn-container'>
            <button className='button button--secondary' onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Userprofile;
