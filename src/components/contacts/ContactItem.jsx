import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactItem.module.css';

export const ContactItem = props => {
  const { id, name, number, onDeleteContact } = props;
  return (
    <li className={s.item}>
       {name}: {number}
      <button
        className={s.button}
        type="Submit"
        onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};