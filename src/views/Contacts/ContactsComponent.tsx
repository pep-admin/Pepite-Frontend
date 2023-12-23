// Import des libs externes
import { Container, Stack, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';

// Import des composants internes
import Header from '@utils/Header';
import { Item } from '@utils/styledComponent';
import SearchBar from '@utils/SearchBar';
import ContactsSuggestions from './ContactsSuggestions';
import ContactsFriendRequests from './ContactsFriendRequests';

// Import des requêtes
import { getTenUsers } from '@utils/request/users/getTenUsers';
import { getFriendRequestList } from '@utils/request/friendship/getFriendRequestList';

const ContactsComponent = () => {
  // Utilisateur connecté
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [usersSuggestion, setUsersSuggestion] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);

  // Récupération de dix utilisateurs pour les suggestions
  const getUsers = async () => {
    const users = await getTenUsers();
    setUsersSuggestion(users);
  };

  // Récupération des demandes d'amis
  const getFriendRequests = async () => {
    const list = await getFriendRequestList();
    setFriendRequestList(list);
    console.log(list);
  };

  useEffect(() => {
    getUsers();
    getFriendRequests();
  }, []);

  return (
    <>
      <Header userInfos={userInfos} setUserInfos={setUserInfos} />
      <Container
        maxWidth="xl"
        sx={{
          padding: '6px',
          backgroundColor: '#F4F4F4',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        <Stack direction="column" spacing={1}>
          <SearchBar
            Item={Item}
            page={'contacts'}
            userInfos={userInfos}
            chosenUser={null}
            handlePoster={null}
          />
          <Item overflow="hidden">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {'Personnes suggérées'}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              padding="6px 6px 0 6px"
              columnGap="6px"
              sx={{ overflowX: 'scroll' }}
            >
              {usersSuggestion &&
                usersSuggestion.map(user => {
                  return <ContactsSuggestions key={user.id} user={user} />;
                })}
            </Stack>
          </Item>
          <Item overflow="hidden">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {"Demandes d'amitié"}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              padding="6px"
              rowGap="6px"
              sx={{ overflowX: 'scroll' }}
            >
              {friendRequestList &&
                friendRequestList.map(user => {
                  return <ContactsFriendRequests key={user.id} user={user} />;
                })}
            </Stack>
          </Item>
        </Stack>
      </Container>
    </>
  );
};

export default ContactsComponent;
