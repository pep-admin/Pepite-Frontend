import { Box, Container } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { useEffect, useRef, useState } from 'react';
import ContactsNav from './ContactsNav';
import { getFriendRequestList } from '@utils/request/friendship/getFriendRequestList';
import { useParams } from 'react-router-dom';
import { getFriendsList } from '@utils/request/friendship/getFriendsList';
import ContactsList from './ContactsList';
import { getFollowedList } from '@utils/request/followed/getFollowedList';
import ContactsTopContent from './ContactsTopContent';
import ContactsAdd from './ContactsAdd';

const ContactsComponent2 = () => {

  const { id } = useParams();

  const [contactsSectionIndex, setContactsSectionIndex] = useState(0);
  const [friendsRequests, setFriendsRequests] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState([]);

  const scrollableContainerRef = useRef(null);
  const contactsSectionRef = useRef('Amis');

  const getContacts = async () => {
    // console.log('Fetching movies... La page =>', pageRef.current);
    setLoadingContacts(Array(20).fill({})); // Ajoute 20 films fictifs en tant que placeholders pour le Skeleton

    let friendsRequests = [];
    let contacts = [];

    switch (contactsSectionRef.current) {
      case 'Amis':
        friendsRequests = await getFriendRequestList();
        contacts = await getFriendsList(id);
        break;
      case 'Suivis':
        contacts = await getFollowedList(id);
        break;
      default:
        break;
    }

    if(friendsRequests && friendsRequests.length > 0) {
      console.log('les demandes !', friendsRequests);
      
      setFriendsRequests(friendsRequests);
    }
    if (contacts && contacts.length > 0) {
      console.log('les contacts !', contacts);
      setContacts(contacts);
      // pageRef.current++;
    } 
    // else {
    //   setHasMore(false); // S'il n'y a plus de films à charger
    // }

    setLoadingContacts([]); // Retirer les placeholders une fois le chargement terminé
  };

  useEffect(() => {
    setContacts([]);
    // pageRef.current = 1;

    switch (contactsSectionIndex) {
      case 0:
        contactsSectionRef.current = 'Demandes';
        break;
      case 1:
        contactsSectionRef.current = 'Amis';
        break;
      case 2:
        contactsSectionRef.current = 'Suivis';
        break;
      default:
        break;
    }

    // Remonter le scroll du conteneur en haut
    // if (contactsSectionRef.current) {
    //   contactsSectionRef.current.scrollTo({ top: 0 });
    // }

    getContacts();
  }, [contactsSectionIndex]);

  return (
    <>
      <Header2 page={'Mes contacts'} isTrailerFullscreen={null} />
      <Box paddingTop='5px' sx={{ backgroundColor: '#052525' }}>
        <ContactsNav
          contactsSectionIndex={contactsSectionIndex}
          setContactsSectionIndex={setContactsSectionIndex}
          friendRequestsCount={friendsRequests.length}
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
          contactsFrom={contactsSectionRef.current} 
          contactsSectionIndex={contactsSectionIndex} 
          friendsRequests={friendsRequests} 
          loadingContacts={loadingContacts}   
        />
        {
          contactsSectionIndex === 1||
          contactsSectionIndex === 2 ?
            <ContactsList 
              contactsFrom={contactsSectionRef.current} 
              contacts={contacts} 
              loadingContacts={loadingContacts} 
            />
            :
            <ContactsAdd />
        }
      </Container>
    </>
  );
};

export default ContactsComponent2;