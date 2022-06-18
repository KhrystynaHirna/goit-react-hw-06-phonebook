import { useState, useEffect } from 'react';
import {ContactForm} from '../phonebookForm/ContactForm';
import {ContactList} from '../contacts/ContactList';
import { Filter } from '../filter/Filter';
import s from '../app/App.module.css';
import { nanoid } from "nanoid";

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    localStorage.getItem('contactList')
      ? JSON.parse(localStorage.getItem('contactList'))
      : initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };
  const onFilterInput = event => {
    setFilter(event.currentTarget.value);
};
    
  const onFormSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(contacts => [contact, ...contacts]);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
      <div className={s.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} contactList={contacts} />
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChange={onFilterInput} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact}
      />
    </div>
  );
};
