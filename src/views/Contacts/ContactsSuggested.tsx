import { useCardsToShowHorizontal } from '@hooks/useCardsToShowHorizontal';
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';
import { Stack, Typography } from '@mui/material';
import UserAvatar from '@utils/components/UserAvatar';
import { getUsersSuggestions } from '@utils/request/users/getUsersSuggestions';
import { useEffect, useRef, useState } from 'react';

const ContactsSuggested = ({ contactsFrom, contactsSectionIndex }) => {  

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
      console.log('loading users');
      
      // if (!hasMore) return;

      setAreUsersLoading(true); // Début du chargement des utilisateurs

      const response = await getUsersSuggestions(
        cardsToShow,
        suggestionsPageRef.current,
      );

      console.log('la réponse =>', response);
      

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
  }, [contactsSectionIndex]);

  return (
    <Stack spacing={3}>
      <Stack>
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
          marginTop='4px'
        >
          {
            contactsFrom === 'Amis' ?
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
        spacing={4}
        overflow='auto'
      >
        {usersSuggestion.length ?
          usersSuggestion.map((user) => {
            return(
              <Stack 
                key={user.id} 
                alignItems='center'
                width='80px'  
              >
                <UserAvatar
                  userInfos={user}
                  picHeight={'70px'}
                  picWidth={'70px'}
                  sx={null}
                  redirection={true}
                />
                <Typography
                  align='center'
                  fontFamily='Pragati Narrow, sans-serif'
                  fontSize='0.9em'
                  lineHeight='1'
                  color='text.lightWhite'
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    marginTop: '12px'
                  }}
                >
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
              </Stack>
              
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