// Import des libs externes
import { Container, Stack, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import Header from '@utils/components/Header';
import { Item } from '@utils/components/styledComponent';
import SearchBar from '@utils/components/SearchBar';
import MainItemList from '@utils/components/MainItemList';
import ContactsSuggestions from '@views/Contacts/ContactsSuggestions';

// Import des requêtes
import { getFriendRequestList } from '@utils/request/friendship/getFriendRequestList';
import { getFriendsList } from '@utils/request/friendship/getFriendsList';
import { getFollowedList } from '@utils/request/followed/getFollowedList';

const ContactsComponent = () => {
  const { id } = useParams();

  // Utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  // Pour la page contacts
  const [friendRequestList, setFriendRequestList] = useState([]); // Liste des demandes d'amitié
  const [friendsList, setFriendsList] = useState([]); // Liste des amis
  const [followedList, setFollowedList] = useState([]); // Liste des suivis

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
      <Header loggedUserInfos={loggedUserInfos} />
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
            loggedUserInfos={loggedUserInfos}
            chosenUser={null}
            handlePoster={null}
          />
          <ContactsSuggestions
            page={'contacts'}
            friendsList={friendsList}
            followedList={followedList}
            getFriendsRequests={getFriendsRequests}
            getFriends={getFriends}
            getFollowed={getFollowed}
          />
          {/* Demandes d'amis */}
          <Item overflow="hidden" maxheight="250px">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {friendRequestList.length
                  ? `${friendRequestList.length}`
                  : 'Aucune '}
                {` demande${friendRequestList.length > 1 ? 's' : ''} d'amitié`}
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
              sx={{ maxHeight: '188px', overflowY: 'scroll' }}
            >
              {friendRequestList.length ? (
                friendRequestList.map((user, index) => {
                  return (
                    <MainItemList
                      key={user.id}
                      type={'requests'}
                      data={user}
                      list={friendRequestList[index].common_friends_details}
                      getRequest={getFriendsRequests}
                      getRequest2={getFriends}
                      getFollowed={null}
                      isLast={index === friendRequestList.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        {"Aucune demande d'amitié "}
                      </span>
                      {'pour le moment.'}
                    </>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Item>
          {/* Amis */}
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
              sx={{ maxHeight: '188px', overflowY: 'scroll' }}
            >
              {friendsList.length ? (
                friendsList.map((user, index) => {
                  return (
                    <MainItemList
                      key={user.id}
                      type={'friends'}
                      data={user}
                      list={friendsList[index].common_friends_details}
                      getRequest={getFriendsRequests}
                      getRequest2={getFriends}
                      getFollowed={null}
                      isLast={index === friendsList.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>{'Aucun ami '}</span>
                      {"ne figure encore dans votre liste d'amis."}
                    </>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Item>
          {/* Suivis */}
          <Item overflow="hidden" maxheight="250px">
            <Stack
              direction="row"
              height="25px"
              alignItems="center"
              justifyContent="space-between"
              padding="0 13px"
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                {followedList.length} suivi{followedList.length > 1 ? 's' : ''}
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
              {followedList.length ? (
                followedList.map((user, index) => {
                  return (
                    <MainItemList
                      key={user.id}
                      type={'followed'}
                      data={user}
                      list={followedList[index].common_friends_details}
                      getRequest={getFollowed}
                      getRequest2={null}
                      isLast={index === followedList.length - 1}
                    />
                  );
                })
              ) : (
                <Stack direction="column">
                  <Typography variant="body2" component="p">
                    <>
                      <span style={{ fontWeight: 'bold' }}>
                        {'Vous ne suivez encore personne '}
                      </span>
                      {'pour le moment.'}
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
