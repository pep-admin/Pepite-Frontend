import { getUserInteractionRequest } from '@utils/request/contacts/getUserInteractionRequest';
import ContactsComponent2 from '@views/Contacts/ContactsComponent2';
import { useEffect, useState } from 'react';

const ContactContainer = () => {

  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  const getContacts = async () => {
    setLoadingContacts(true);

    const userInteractionList = await getUserInteractionRequest();
    setContacts(userInteractionList);
    console.log('les infos contacts =>', userInteractionList);

    setLoadingContacts(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return !loadingContacts && 
    <ContactsComponent2 contacts={contacts} />;
};

export default ContactContainer;
