import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = 'api/v1/users/';
    const register = async () => {
      try {
        await axios.post(API_URL + 'signup', {
          username,
          email,
          password,
          passwordConfirm,
        });
        navigate('/userprofile');
      } catch (err) {
        console.log(err);
      }
    };
    register();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          className='form__name'
          placeholder='Nombre'
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='email'
          className='form__email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='form__password'
          placeholder='Contraseña'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          className='form__passwordConfirm'
          placeholder='Confirma la contraseña'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <input type='submit' className='button' />
      </form>
    </div>
  );
};

export default Signup;
