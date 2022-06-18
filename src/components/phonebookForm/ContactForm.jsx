import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export const ContactForm = ({ onSubmit, contactList }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const hasName = contactList.find(
      contact => contact.name === name || contact.number === number
    );
    if (hasName) {
      Notify.warning(`${name} is already in contacts.`);
    } else {
      onSubmit({
        name,
        number,
      });
      reset();
    }
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();
  
  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <label htmlFor={nameInputId} className={s.label}>
      Name
        <input
          className={s.input_first}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required={true}
        />
      </label>
      <label htmlFor={numberInputId} className={s.label}>
        Number
        <input
          className={s.input_second}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required={true}
        />
      </label>

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

