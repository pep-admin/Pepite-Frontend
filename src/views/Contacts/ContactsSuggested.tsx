import { useCardsToShowHorizontal } from '@hooks/useCardsToShowHorizontal';
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';
import { Stack, Typography } from '@mui/material';
import UserAvatar from '@utils/components/UserAvatar';
import { getUsersSuggestions } from '@utils/request/users/getUsersSuggestions';
import React, { useEffect, useRef, useState } from 'react';

const ContactsSuggested = ({ contactsFrom }) => {

  const [usersSuggestion, setUsersSuggestion] = useState([]); // Les utilisateurs suggérés
  const [areUsersLoading, setAreUsersLoading] = useState(true); // Etat de chargement des utilisateurs suggérés
  const [hasMore, setHasMore] = useState(true); // Il reste ou non des utilisateurs à récupérer

  const scrollContainerRef = useRef(null);
  const suggestionsPageRef = useRef(1);

  /* Calcule les cards à afficher selon la largeur du viewport.
    width: 70px, gap: 7px, 3 cards en plus pour la marge
  */
  const cardsToShow = useCardsToShowHorizontal(70, 7, 3);

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
        console.log('les utilisateurs =>', response.data);
        
      } else {
        console.log('plus aucun utilisateur a charger');

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
    250,
    scrollContainerRef.current,
    hasMore,
  );

  useEffect(() => {
    loadUsers();
  }, [])

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`Personnes suggérées`}
        </Typography>
        <Typography
          component='h2'
          color='gray'
          fontSize='1em'
          fontWeight='400'
          lineHeight='1'
          marginTop='1px'
        >
          {
            contactsFrom === 'Amis' || 
            contactsFrom === 'Ajouter' ?
              'Amis en commun'
            : contactsFrom === 'Suivis' ?
              'Pépites en commun'
            : null
          }
        </Typography>
      </Stack>
      <Stack 
        ref={scrollContainerRef}
        direction='row'
      >
        {usersSuggestion.length ?
          usersSuggestion.map((user, index) => {
            return(
              <UserAvatar
                userInfos={user}
                picHeight={60}
                picWidth={60}
              />
            )
          })
          :
          <Typography
            color='#555555'
            lineHeight='1'
          >
            {'Aucune suggestion pour le moment.'}
          </Typography>
        }
      </Stack>
    </Stack>
    
  );
};

export default ContactsSuggested;