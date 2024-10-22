import { Box, Container } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { useEffect, useRef, useState } from 'react';
import ContactsNav from './ContactsNav';
import ContactsList from './ContactsList';
import ContactsAdd from './ContactsAdd';
import ContactsTopContent from './ContactsTopContent';

const ContactsComponent2 = ({ contacts }) => {
  const [contactsSectionIndex, setContactsSectionIndex] = useState(0);
  const [contactsSection, setContactsSection] = useState('Demandes'); // Utilisation de useState pour le nom de la section

  const friendRequestReceived = contacts.receivedFriendRequests;
  const friendRequestSent = contacts.sentFriendRequests;
  const friendsList = contacts.friends;
  const followedList = contacts.followed;

  const scrollableContainerRef = useRef(null);

  // Mettre à jour le nom de la section chaque fois que l'index change
  useEffect(() => {
    switch (contactsSectionIndex) {
      case 0:
        setContactsSection('Demandes');
        break;
      case 1:
        setContactsSection('Amis');
        break;
      case 2:
        setContactsSection('Suivis');
        break;
      default:
        break;
    }

    // Remonter le scroll du conteneur en haut (si nécessaire)
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({ top: 0 });
    }

  }, [contactsSectionIndex]); // Re-exécutez chaque fois que contactsSectionIndex change

  return (
    <>
      <Header2 page={'Mes contacts'} isTrailerFullscreen={null} />
      <Box paddingTop='5px' sx={{ backgroundColor: '#052525' }}>
        <ContactsNav
          contactsSectionIndex={contactsSectionIndex}
          setContactsSectionIndex={setContactsSectionIndex}
          friendRequestsCount={friendRequestReceived.length}
        />
      </Box>
      <Container
        id="scrollableContainer"
        ref={scrollableContainerRef}
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 !important',
          margin: '0',
          backgroundColor: '#011212',
          height: 'calc(100vh - 109px)',
          overflow: 'auto',
        }}
      >
        <ContactsTopContent
          contactsFrom={contactsSection}  // Passez le nom de la section au composant enfant
          contactsSectionIndex={contactsSectionIndex} 
          friendsRequests={friendRequestReceived} 
        />
        {
          contactsSectionIndex === 1 || contactsSectionIndex === 2 ?
            <ContactsList 
              contactsFrom={contactsSection}  // Utilisation du nom de la section ici
              contacts={contacts} 
            />
            :
            <ContactsAdd />
        }
      </Container>
    </>
  );
};

export default ContactsComponent2;
