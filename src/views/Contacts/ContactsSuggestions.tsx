// Import des libs externes
import { Stack, Typography, Divider, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import { Item } from '@utils/styledComponent';
import SuggestionsCard from './SuggestionsCard';

// Import des requêtes
import { getUsersSuggestions } from '@utils/request/users/getUsersSuggestions';

// Import des hooks
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';
import { useCardsToShow } from '@hooks/useCardsToShow';

const ContactsSuggestions = ({
  page,
  friendsList,
  followedList,
  getFriendsRequests,
  getFriends,
  getFollowed,
}) => {
  const [usersSuggestion, setUsersSuggestion] = useState([]); // Les utilisateurs suggérés
  const [areUsersLoading, setAreUsersLoading] = useState(true); // Etat de chargement des utilisateurs suggérés
  const [hasMore, setHasMore] = useState(true); // Il reste ou non des utilisateurs à récupérer

  const scrollContainerRef = useRef(null);
  const suggestionsPageRef = useRef(1);

  /* Calcule les cards à afficher selon la largeur du viewport.
    width: 95px, gap: 6px, 3 cards en plus pour la marge
  */
  const cardsToShow = useCardsToShow(95, 6, 3);

  const loadUsers = async () => {
    try {
      if (!hasMore) return;

      setAreUsersLoading(true); // Début du chargement des utilisateurs
      const response = await getUsersSuggestions(
        cardsToShow,
        suggestionsPageRef.current,
      );

      suggestionsPageRef.current++; // Incrémentation de la page

      if (response.data.hasMore) {
        setUsersSuggestion(prevUsers => [...prevUsers, ...response.data.users]);
      } else {
        setHasMore(false); // Fin des données d'utilisateurs
      }
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    } finally {
      setAreUsersLoading(false);
    }
  };

  // Hook personnalisé de détection du scroll horizontal
  const [isFetching] = useHorizontalScroll(
    loadUsers,
    100,
    scrollContainerRef.current,
    hasMore,
  );

  useEffect(() => {
    if (cardsToShow && hasMore) loadUsers();
  }, [cardsToShow, hasMore]);

  return (
    <Item overflow="hidden">
      <Stack direction="row" height="25px" alignItems="center" padding="0 13px">
        <Typography variant="body2" component="p" fontWeight="bold">
          {'Personnes suggérées'}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        ref={scrollContainerRef}
        direction="row"
        padding="6px 6px 0 6px"
        columnGap="6px"
        sx={{ overflowX: 'scroll' }}
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
        {(isFetching || areUsersLoading) &&
          [...Array(cardsToShow)].map((_, i) => (
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
          ))}
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
