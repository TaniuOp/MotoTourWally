import React from 'react';
import Accordion from './Accordion';

const items = [
  {
    title: 'Puedo llevar mi propia moto?',
    content:
      'Las motos se alquilan in situ para mantener categoría, comodidad y ayudar a locales',
  },
  {
    title: 'Estan incluidas las comidas?',
    content:
      'Desayunos y cenas las hacemos en conjunto, pero se puede almorzar libremente',
  },
  {
    title: '¿Puedo ir si soy menor de edad?',
    content: 'Como parillero, si',
  },
];

const Faqs = () => {
  return (
    <div className='contact-Container'>
      <h3 className='heading__tertiary titles'>Preguntas frecuenes</h3>

      <Accordion items={items} />
    </div>
  );
};
export default Faqs;
