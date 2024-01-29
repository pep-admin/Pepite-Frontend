// Import des libs externes
import { Stack, Typography, Divider, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import { Item } from '@utils/styledComponent';
import SuggestionsCard from './SuggestionsCard';

// Import des requêtes
import { getUsersSuggestions } from '@utils/request/users/getUsersSuggestions';

const ContactsSuggestions = ({
  page,
  friendsList,
  followedList,
  getFriendsRequests,
  getFriends,
  getFollowed,
}) => {
  const [usersSuggestion, setUsersSuggestion] = useState([]); // Les utilisateurs suggérés
  const [suggestionsPage, setSuggestionsPage] = useState(1); // La page d'utilisateurs incrémenté à chaque scroll vers la gauche
  const [cardsToShow, setCardsToShow] = useState(0); // Le nombre d'utilisateurs à fetch selon la largeur du viewport
  const [areUsersLoading, setAreUsersLoading] = useState(true); // Etat de chargement des utilisateurs suggérés
  const [hasMore, setHasMore] = useState(true);

  // Détecte le scroll lorsque l'utilisateur cherche à voir de nouveaux utilisateurs suggérés
  const handleScroll = event => {
    const { scrollLeft, clientWidth, scrollWidth } = event.currentTarget;

    if (
      scrollWidth - Math.ceil(scrollLeft + clientWidth) < 100 &&
      !areUsersLoading &&
      hasMore
    ) {
      console.log('recharge !!!');

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
          setHasMore(false); // Fin des données d'utilisateurs
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs', error);
      } finally {
        setAreUsersLoading(false);
      }
    };

    if (cardsToShow && hasMore) {
      loadUsers();
    }
  }, [suggestionsPage, cardsToShow]);

  useEffect(() => {
    console.log('suggestion utilisateurs :', usersSuggestion);
  }, [usersSuggestion]);

  useEffect(() => {
    const calculateCardsToShow = () => {
      const viewportWidth = window.innerWidth;
      const cardWidth = 95; // Largeur d'une carte
      const gap = 6; // Espace entre les cartes
      const cardsToShow = Math.floor(viewportWidth / (cardWidth + gap)) + 2;
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

  return (
    <Item overflow="hidden">
      <Stack direction="row" height="25px" alignItems="center" padding="0 13px">
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
              <SuggestionsCard
                key={user.id}
                page={page}
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
              _,
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
};

ContactsSuggestions.propTypes = {
  page: PropTypes.string.isRequired,
  friendsList: PropTypes.array,
  followedList: PropTypes.array,
  getFriendsRequests: PropTypes.func,
  getFriends: PropTypes.func,
  getFollowed: PropTypes.func,
};

export default ContactsSuggestions;
