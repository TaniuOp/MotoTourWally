import { useState } from 'react';
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
    <div className='signup'>
      <h1 className='heading__tertiary'>
        Registrate y disfruta de nuestras mejores ofertas
      </h1>

      <form onSubmit={handleSubmit} className='form form-auth'>
        <label className='form-label'>Nombre</label>

        <input
          type='text'
          className='form-input'
          placeholder='Nombre'
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className='form-label'>Correo</label>

        <input
          type='email'
          className='form-input'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='form-label'>Contraseña</label>

        <input
          type='password'
          className='form-input'
          placeholder='Contraseña'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className='form-label'>Confirma la contraseña</label>

        <input
          type='password'
          className='form-input'
          placeholder='Confirma la contraseña'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div className='form-group button-container'>
          <input type='submit' className='button button--primary' />
        </div>
      </form>
    </div>
  );
};

export default Signup;
