import { Box, Container } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { useEffect, useRef, useState } from 'react';
import ContactsNav from './ContactsNav';
import ContactsList from './ContactsList';
import ContactsAdd from './ContactsAdd';
import ContactsTopContent from './ContactsTopContent';
import { getUserInteractionRequest } from '@utils/request/contacts/getUserInteractionRequest';

const ContactsComponent2 = () => {

  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [followedList, setFollowedList] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const [loadingContacts, setLoadingContacts] = useState(true);
  const [contactsSectionIndex, setContactsSectionIndex] = useState(0);
  const [contactsSection, setContactsSection] = useState('Demandes'); // Utilisation de useState pour le nom de la section

  const scrollableContainerRef = useRef(null);

  const getContacts = async () => {
    try {
      // setLoadingContacts(true);

      const contacts = await getUserInteractionRequest();
      setFriendRequestList(contacts.receivedFriendRequests);
      setFriendsList(contacts.friends);
      setFollowedList(contacts.followed);

    } catch (error) {
      console.log(error);
      
    } finally {
      setLoadingContacts(false);
    }
  };

  // Fonction de rappel pour indiquer qu'une mise à jour a eu lieu
  const handleUpdate = async () => {
    await getContacts(); // Re-récupère les contacts pour synchroniser les composants
  };

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

    getContacts();

  }, [contactsSectionIndex]);

  return (
    <>
      <Header2 page={'Mes contacts'} isTrailerFullscreen={null} />
      <Box paddingTop='5px' sx={{ backgroundColor: '#052525' }}>
        <ContactsNav
          contactsSectionIndex={contactsSectionIndex}
          setContactsSectionIndex={setContactsSectionIndex}
          friendRequestsCount={!loadingContacts ? friendRequestList.length : null}
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
        {
          !loadingContacts &&
          <>
            <ContactsTopContent
              contactsFrom={contactsSection}
              contactsSectionIndex={contactsSectionIndex} 
              friendsRequests={friendRequestList} 
              onUpdate={handleUpdate}
            />
            {
              contactsSectionIndex === 1 || contactsSectionIndex === 2 ?
              <ContactsList 
                contactsFrom={contactsSection} 
                contactList={contactsSectionIndex === 1 ? friendsList : followedList}
                onUpdate={handleUpdate}
              />
              :
              <ContactsAdd 
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                onUpdate={handleUpdate} 
              />
            }
          </>
        }
      </Container>
    </>
  );
};

export default ContactsComponent2;
