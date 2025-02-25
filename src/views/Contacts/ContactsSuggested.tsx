import { useCardsToShowHorizontal } from '@hooks/useCardsToShowHorizontal';
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';
import { Stack, Typography, Skeleton } from '@mui/material';
import UserAvatar from '@utils/components/UserAvatar';
import { getUsersSuggestions } from '@utils/request/users/getUsersSuggestions';
import { useEffect, useRef, useState } from 'react';

const ContactsSuggested = ({ contactsFrom, contactsSectionIndex }) => {
  const [usersSuggestion, setUsersSuggestion] = useState([]); // Utilisateurs chargés
  const [isLoading, setIsLoading] = useState(true); // Gestion du chargement
  const [hasMore, setHasMore] = useState(true); // Gestion du chargement infini
  const [loadingSkeletons, setLoadingSkeletons] = useState([]); // Stockage des skeletons à afficher

  const scrollContainerRef = useRef(null);
  const suggestionsPageRef = useRef(1);

  /* Calcule les cards à afficher selon la largeur du viewport. */
  const cardsToShow = useCardsToShowHorizontal(70, 7, 3);

  const loadUsers = async () => {
    if (isLoading || !hasMore) return; // Empêche les chargements multiples

    setIsLoading(true);

    console.log('Nombre de cards à récup =>', cardsToShow);

    // Ajout de Skeletons pendant le chargement
    setLoadingSkeletons(prevSkeletons => [
      ...prevSkeletons,
      ...new Array(cardsToShow).fill(null),
    ]);

    try {
      const suggestionType = contactsSectionIndex === 1 ? 'friends' : 'gold';

      const response = await getUsersSuggestions(
        suggestionType,
        cardsToShow,
        suggestionsPageRef.current,
      );

      suggestionsPageRef.current++; // Incrémentation de la page

      if (response.data.hasMore) {
        setUsersSuggestion(prevUsers => [...prevUsers, ...response.data.users]);
      } else {
        console.log('plus aucun utilisateur a charger');
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    } finally {
      setIsLoading(false);
      setLoadingSkeletons([]); // Retirer les Skeletons une fois chargés
    }
  };

  // Hook de détection du scroll horizontal
  useHorizontalScroll(loadUsers, 250, scrollContainerRef.current, hasMore);

  // Réinitialisation du state lors du changement de contactsSectionIndex
  useEffect(() => {
    if (contactsSectionIndex === 0 || cardsToShow === 0) return;

    console.log('Réinitialisation des suggestions...');
    setUsersSuggestion([]); // Réinitialise la liste des suggestions
    setHasMore(true); // Permet de recharger de nouvelles suggestions
    suggestionsPageRef.current = 1; // Remet la pagination à zéro

    // Attendre que `setUsersSuggestion([])` soit bien pris en compte avant de charger les nouvelles données
    setTimeout(() => {
      loadUsers();
    }, 0);
  }, [contactsSectionIndex, cardsToShow]);

  useEffect(() => {
    console.log('les users suggérés =>', usersSuggestion);
  }, [usersSuggestion]);

  return (
    <Stack spacing={3}>
      <Stack>
        <Typography
          component="h2"
          color="text.primary"
          fontSize="1.15em"
          fontWeight="400"
          textTransform="uppercase"
        >
          Personnes suggérées
        </Typography>
        <Typography
          component="h2"
          color="gray"
          fontSize="1em"
          fontWeight="400"
          lineHeight="1"
          marginTop="4px"
        >
          {contactsFrom === 'Amis'
            ? 'Amis en commun'
            : contactsFrom === 'Suivis'
            ? 'Pépites en commun'
            : null}
        </Typography>
      </Stack>
      <Stack
        ref={scrollContainerRef}
        direction="row"
        spacing={4}
        overflow="auto"
      >
        {usersSuggestion.length && !isLoading ? (
          usersSuggestion.map(user => (
            <Stack key={user.id} alignItems="center" width="80px">
              <UserAvatar
                userInfos={user}
                picHeight="70px"
                picWidth="70px"
                sx={null}
                redirection={true}
                onSelect={null}
              />
              <Typography
                align="center"
                fontFamily="Pragati Narrow, sans-serif"
                fontSize="0.9em"
                lineHeight="1"
                color="text.lightWhite"
                sx={{
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  marginTop: '12px',
                }}
              >
                {`${user.first_name} ${user.last_name}`}
              </Typography>
            </Stack>
          ))
        ) : contactsSectionIndex === 1 ? (
          <Typography
            color="#555555"
            fontSize="1em"
            fontWeight="400"
            lineHeight="1"
            marginTop="4px"
          >
            {'Vous devez avoir au moins un ami.'}
          </Typography>
        ) : (
          <Typography
            color="#555555"
            fontSize="1em"
            fontWeight="400"
            lineHeight="1"
            marginTop="4px"
          >
            {'Vous devez avoir ajouté au moins une pépite.'}
          </Typography>
        )}
        {/* Affichage des Skeletons uniquement lorsqu'on charge des données */}
        {loadingSkeletons.length > 0 &&
          loadingSkeletons.map((_, index) => (
            <Stack key={`skeleton-${index}`} alignItems="center" width="80px">
              <Skeleton variant="circular" width={70} height={70} />
              <Skeleton width={60} height={16} sx={{ marginTop: '12px' }} />
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ContactsSuggested;
