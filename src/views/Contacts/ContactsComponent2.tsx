// Import des libs externes
import { Container, Stack , Typography, Box} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import Header from '@utils/components/Header';
import TopContributors from './TopContributors';
import ContactsFriendsFollowed from './ContactsFriendsFollowed';

// Import des requêtes
import { getFriendRequestList } from '@utils/request/friendship/getFriendRequestList';
import { getFriendsList } from '@utils/request/friendship/getFriendsList';
import { getFollowedList } from '@utils/request/followed/getFollowedList';

const ContactsComponent2 = () => {

  const { id } = useParams();

  const [friendRequestList, setFriendRequestList] = useState([]); // Liste des demandes d'amitié
  const [friendsList, setFriendsList] = useState([]); // Liste des amis
  const [followedList, setFollowedList] = useState([]); // Liste des suivis

  const scrollContainerRef = useRef(null);

  // Récupération des demandes d'amis
  const getFriendsRequests = async () => {    
    const askList = await getFriendRequestList();
    setFriendRequestList(askList);
  };

  // Récupération de la liste d'amis
  const getFriends = async () => {    
    const friendsList = await getFriendsList(id);
    setFriendsList(friendsList);
  };

  // Récupération des suivis
  const getFollowed = async () => {
    const followedList = await getFollowedList(id);
    setFollowedList(followedList);
  };

  useEffect(() => {
    getFriendsRequests();
    getFriends();
    getFollowed();
  }, []);  

  return (
    <>
      <Header page={'contacts'} />
      <Container
        sx={{ 
          minHeight: 'calc(100vh - 50px)',
          padding: '0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Stack flexGrow='1' >
          <Stack marginTop='10px' padding='0 4%' >
            <Typography
              component='h4' 
              variant='body2' 
              fontWeight='600'
              color='#383838'  
            >
              {'Personnes suggérées - Pépites en commun'}
            </Typography>
          </Stack>
          <Stack 
            ref={scrollContainerRef}
            margin='5px 0 15px 4%' 
            sx={{
              overflowX: 'scroll',
            }}
          >
            <TopContributors 
              page={'contacts'} 
              scrollContainerRef={scrollContainerRef} 
              getFriendsRequests={getFriendsRequests}
              getFriends={getFriends} 
              getFollowed={getFollowed} 
            />
          </Stack>
          <Stack padding='0 4%' >
            <Typography
              component='h4' 
              variant='body2' 
              fontWeight='600'
              color='#383838'  
            >
              {'Demandes d\'amitié - Amis - Suivis'}
            </Typography>
          </Stack>
          <Box
            width='100vw' 
            marginTop='33px'
            bgcolor='#CAE6E4'
            position='relative'
            display='flex'
            flexDirection='column'
            flexGrow='1'
          >
            <Stack padding='0 4%' marginTop='-27px' width='100%' flexGrow='1'>
              <ContactsFriendsFollowed 
                contactsType={'requests'}
                contactsList={friendRequestList}
                getRequest={getFriendsRequests}
                getRequest2={getFriends}
              />
              <ContactsFriendsFollowed 
                contactsType={'friends'}
                contactsList={friendsList}
                getRequest={getFriends}
                getRequest2={null}
              />
              <ContactsFriendsFollowed 
                contactsType={'followed'}
                contactsList={followedList}
                getRequest={getFollowed}
                getRequest2={null}
              />
            </Stack>            
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default ContactsComponent2;