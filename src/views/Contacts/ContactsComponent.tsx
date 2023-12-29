// Import des libs externes
import { Container, Stack, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import Header from '@utils/Header';
import { Item } from '@utils/styledComponent';
import SearchBar from '@utils/SearchBar';
import ContactsSuggestions from './ContactsSuggestions';
import ContactsMainItem from './ContactsMainItem';

// Import des requêtes
import { getTenUsers } from '@utils/request/users/getTenUsers';
import { getFriendRequestList } from '@utils/request/friendship/getFriendRequestList';
import { getFriendsList } from '@utils/request/friendship/getFriendsList';
// import { handleFriendship } from '@utils/request/friendship/handleFriendship';

const ContactsComponent = () => {
  const { id } = useParams();

  // Utilisateur connecté
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [usersSuggestion, setUsersSuggestion] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  // Récupération de dix utilisateurs pour les suggestions
  const getUsers = async () => {
    const users = await getTenUsers();
    setUsersSuggestion(users);
  };

  // Récupération des demandes d'amis
  const getFriendRequests = async () => {
    const askList = await getFriendRequestList();
    setFriendRequestList(askList);
  };

  // Récupération de la liste d'amis
  const getFriendsNumber = async () => {
    const friendsList = await getFriendsList(id);
    setFriendsList(friendsList);
  };

  useEffect(() => {
    getUsers();
    getFriendRequests();
    getFriendsNumber();
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
                  return (
                    <ContactsSuggestions
                      key={user.id}
                      user={user}
                      friendRequestList={friendRequestList}
                      getFriendRequests={getFriendRequests}
                      getFriendsNumber={getFriendsNumber}
                    />
                  );
                })}
            </Stack>
          </Item>
          <Item overflow="hidden" maxheight="250px">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {"Demandes d'amitié"}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                fontWeight="bold"
                sx={{
                  cursor: 'pointer',
                }}
              >
                {'Voir toutes'}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              padding="6px"
              rowGap="6px"
              sx={{ overflowY: 'scroll' }}
            >
              {friendRequestList.length ? (
                friendRequestList.map((user, index) => {
                  return (
                    <ContactsMainItem
                      key={user.id}
                      type={'requests'}
                      user={user}
                      getFriendRequests={getFriendRequests}
                      getFriendsNumber={getFriendsNumber}
                      isLast={index === friendRequestList.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body1" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        {"Aucune demande d'amitié "}
                      </span>
                      {'pour le moment.'}
                    </>
                  </Typography>
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold', color: '#F29E50' }}>
                        {'Ajoutez vos amis '}
                      </span>
                      ou
                      <span style={{ fontWeight: 'bold', color: '#24A5A5' }}>
                        {' '}
                        suivez{' '}
                      </span>
                      de nouvelles personnes !
                    </>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Item>
          <Item overflow="hidden" maxheight="250px">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {friendsList.length} ami{friendsList.length > 1 ? 's' : ''}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                fontWeight="bold"
                sx={{
                  cursor: 'pointer',
                }}
              >
                {'Voir tous'}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              padding="6px"
              rowGap="6px"
              sx={{ overflowY: 'scroll' }}
            >
              {friendsList.length ? (
                friendsList.map((user, index) => {
                  return (
                    <ContactsMainItem
                      key={user.id}
                      type={'friends'}
                      user={user}
                      getFriendRequests={getFriendRequests}
                      getFriendsNumber={getFriendsNumber}
                      isLast={index === friendsList.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body1" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        {"Aucune demande d'amitié "}
                      </span>
                      {'pour le moment.'}
                    </>
                  </Typography>
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        Ajoutez vos amis{' '}
                      </span>
                      ou
                      <span style={{ fontWeight: 'bold' }}> suivez </span>de
                      nouvelles personnes !
                    </>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Item>
        </Stack>
      </Container>
    </>
  );
};

export default ContactsComponent;
