// Import des libs externes
import { Container, Stack, Typography, Divider, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import Header from '@utils/Header';
import { Item } from '@utils/styledComponent';
import SearchBar from '@utils/SearchBar';
import ContactsSuggestions from './ContactsSuggestions';
import MainItemList from '@utils/MainItemList';

// Import des requêtes
import { getUsersSuggestions } from '@utils/request/users/getUsersSuggestions';
import { getFriendRequestList } from '@utils/request/friendship/getFriendRequestList';
import { getFriendsList } from '@utils/request/friendship/getFriendsList';
import { getFollowedList } from '@utils/request/followed/getFollowedList';

const ContactsComponent = ({ page }) => {
  const { id } = useParams();

  // Utilisateur connecté
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [usersSuggestion, setUsersSuggestion] = useState([]); // Les utilisateurs suggérés
  const [suggestionsPage, setSuggestionsPage] = useState(1); // La page d'utilisateurs incrémenté à chaque scroll vers la gauche
  const [cardsToShow, setCardsToShow] = useState(0); // Le nombre d'utilisateurs à fetch selon la largeur du viewport
  const [areUsersLoading, setAreUsersLoading] = useState(false); // Etat de chargement des utilisateurs suggérés
  const [hasMore, setHasMore] = useState(true);

  // Pour la page contacts
  const [friendRequestList, setFriendRequestList] = useState([]); // Liste des demandes d'amitié
  const [friendsList, setFriendsList] = useState([]); // Liste des amis
  const [followedList, setFollowedList] = useState([]); // Liste des suivis

  // Détecte le scroll lorsque l'utilisateur cherche à voir de nouveaux utilisateurs suggérés
  const handleScroll = event => {
    const { scrollLeft, clientWidth, scrollWidth } = event.currentTarget;

    if (
      scrollWidth - Math.ceil(scrollLeft + clientWidth) < 100 &&
      !areUsersLoading &&
      hasMore
    ) {
      setAreUsersLoading(true);
      setSuggestionsPage(prevPage => prevPage + 1);
    }
  };

  // Récupère les utilisateurs suggérés
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setAreUsersLoading(true);

        const response = await getUsersSuggestions(
          cardsToShow,
          suggestionsPage,
        );

        if (response.data.hasMore) {
          setUsersSuggestion(prevUsers => [
            ...prevUsers,
            ...response.data.users,
          ]);
        } else {
          setHasMore(false); // Indiquez que vous avez atteint la fin des données
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs', error);
      } finally {
        setAreUsersLoading(false);
      }
    };

    if (cardsToShow && hasMore) {
      console.log('chargement...');

      loadUsers();
    }
  }, [suggestionsPage, cardsToShow]);

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
    console.log('suggestion utilisateurs :', usersSuggestion);
  }, [usersSuggestion]);

  useEffect(() => {
    const calculateCardsToShow = () => {
      const viewportWidth = window.innerWidth;
      const cardWidth = 95; // Largeur d'une carte
      const gap = 6; // Espace entre les cartes
      const cardsToShow = Math.floor(viewportWidth / (cardWidth + gap)) + 1;
      setCardsToShow(cardsToShow);
    };

    // Calcul initial
    calculateCardsToShow();

    // Ajuster le nombre de cartes lors du redimensionnement de la fenêtre
    window.addEventListener('resize', calculateCardsToShow);

    // Nettoyage de l'event listener
    return () => {
      window.removeEventListener('resize', calculateCardsToShow);
    };
  }, []);

  useEffect(() => {
    if (page === 'home' || page === 'list') return;
    getFriendsRequests();
    getFriends();
    getFollowed();
  }, []);

  if (page === 'home' || page === 'list')
    return (
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
          onScroll={handleScroll}
        >
          {usersSuggestion &&
            usersSuggestion.map((user, index) => {
              return (
                <ContactsSuggestions
                  key={user.id}
                  user={user}
                  friendsList={friendsList}
                  followedList={followedList}
                  getFriendsRequests={getFriendsRequests}
                  getFriends={getFriends}
                  getFollowed={getFollowed}
                  isLast={usersSuggestion.length - 1 !== index ? false : true}
                />
              );
            })}
          {areUsersLoading &&
            [...Array(cardsToShow)].map(
              (
                e,
                i, // où `n` est le nombre de skeletons à afficher
              ) => (
                <Stack key={i} height="144px" alignItems="center">
                  <Skeleton
                    variant="rounded"
                    width={95}
                    height={95}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    sx={{ fontSize: '0.95em', marginTop: '4px' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={70}
                    height={27}
                    sx={{ marginTop: '-4px' }}
                    animation="wave"
                  />
                </Stack>
              ),
            )}
        </Stack>
      </Item>
    );

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
              sx={{ maxHeight: '188px', overflowY: 'scroll' }}
            >
              {usersSuggestion &&
                usersSuggestion.map((user, index) => {
                  return (
                    <ContactsSuggestions
                      key={user.id}
                      user={user}
                      friendsList={friendsList}
                      followedList={followedList}
                      getFriendsRequests={getFriendsRequests}
                      getFriends={getFriends}
                      getFollowed={getFollowed}
                      isLast={
                        usersSuggestion.length - 1 !== index ? false : true
                      }
                    />
                  );
                })}
            </Stack>
          </Item>
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

ContactsComponent.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ContactsComponent;
