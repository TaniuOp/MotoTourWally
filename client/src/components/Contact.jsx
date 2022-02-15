import { useForm } from 'react-hook-form';

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <label className='form-label'>Nombre y apellido</label>
      <input
        className='form-input'
        type='text'
        {...register('username', { required: true, maxLength: 80 })}
      />
      <label className='form-label'>Correo electrónico</label>
      <input
        className='form-input'
        type='text'
        {...register('email', {
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      <label className='form-label'>Teléfono</label>
      <input
        className='form-input'
        type='tel'
        {...register('mobile number', {
          required: true,
          maxLength: 11,
          minLength: 8,
        })}
      />
      <div className='form-align-group'>
        <label className='form-label'>Asunto</label>
        <select name='tour' {...register('tour', { required: true })}>
          <option value='Suggestion'>Sugerencia</option>
          <option value='Quote'>Cotización</option>
          <option value='Query'>Consulta</option>
          <option value='Booking'>Reserva</option>
          <option value='Others'>Otros</option>
        </select>{' '}
      </div>
      <div className='form-align-group'>
        <label className='form-label'>
          ¿Quisieras que te contactaramos vía telefono?
        </label>
        <label htmlFor='yes' className='radio-btn-label'>
          Si
        </label>
        <input
          type='radio'
          value='yes'
          {...register('contactByPhone', { required: true })}
        />
        <label className='radio-btn-label' htmlFor='no'>
          No
        </label>
        <input
          type='radio'
          value='No'
          {...register('contactByPhone', { required: true })}
        />{' '}
      </div>
      <label className='form-label'>Cuentanos un poco más</label>
      <textarea
        {...register('message')}
        placeholder='Mensaje'
        className='form-input'
      />
      <input type='submit' className='button button--primary' />
    </form>
  );
}
