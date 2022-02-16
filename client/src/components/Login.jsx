import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const form = useRef();
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  let navigate = useNavigate(); //Once loged in redirect to

  const onChangeMail = (e) => {
    const mail = e.target.value;
    setMail(mail);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const required = (value) => {
    if (!value) {
      return (
        <div className='alert alert-danger' role='alert'>
          Por favor completa todos los campos!
        </div>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = 'api/v1/users/';
    const login = async () => {
      try {
        await axios.post(API_URL + 'login', {
          email,
          password,
        });
        navigate('/userprofile');
      } catch (err) {
        console.log(err);
      }
    };
    login();
  };

  return (
    <div className='login'>
      <h1 className='heading__tertiary'>Entra</h1>
      <div className='div_form'>
        <Form onSubmit={handleSubmit} ref={form} className='form form-auth'>
          <div className='form-align-group'>
            <label htmlFor='email' className='form-label form-auth'>
              Email
            </label>
            <Input
              type='text'
              className='form-input form-auth'
              name='email'
              placeholder='correo electronico'
              value={email}
              onChange={onChangeMail}
              validations={[required]}
              autoComplete='username'
            />
          </div>

          <div className='form-align-group'>
            <label htmlFor='password' className='form-label form-auth'>
              Contraseña
            </label>
            <Input
              type='password'
              className='form-input form-auth'
              name='password'
              placeholder='contraseña'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              autoComplete='current-password'
            />
          </div>

          <div className='form-group'>
            <button className='button button--primary'>Acceder</button>
          </div>

          <Link to='/signup' className='link'>
            ¿No tienes cuenta? Regístrate
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
