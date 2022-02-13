import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const form = useRef();
  const [mail, setMail] = useState('');
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
  };

  return (
    <div className='login'>
      <h1>Entra para ver nuestros Top Tours</h1>{' '}
      <div className='div_form'>
        <Form onSubmit={handleSubmit} ref={form} className='loginFormItself'>
          <div className='form-group'>
            <label htmlFor='mail'>Email</label>
            <Input
              type='text'
              className='form-control'
              name='mail'
              placeholder='correo electronico'
              value={mail}
              onChange={onChangeMail}
              validations={[required]}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <Input
              type='password'
              className='form-control'
              name='password'
              placeholder='contraseña'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className='form-group'>
            <button className='btn'>Acceder</button>
          </div>

          <Link to='/signup'>¿No tienes cuenta? Regístrate</Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
