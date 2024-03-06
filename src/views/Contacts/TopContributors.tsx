import { useCardsToShowHorizontal } from '@hooks/useCardsToShowHorizontal';
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';
import { Avatar, Badge, Box, Modal, Skeleton, Stack, Typography } from '@mui/material';
import TopContributorIcon from '@utils/components/TopContributorIcon';
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import { getUsersSuggestions } from '@utils/request/users/getUsersSuggestions';
import { useEffect, useRef, useState } from 'react';
import ContactsUserFeatures from './ContactsUserFeatures';

const TopContributors = ({ scrollContainerRef }) => {
  
  const [usersSuggestion, setUsersSuggestion] = useState([]); // Les utilisateurs suggérés
  const [areUsersLoading, setAreUsersLoading] = useState(true); // Etat de chargement des utilisateurs suggérés
  const [hasMore, setHasMore] = useState(true); // Il reste ou non des utilisateurs à récupérer
  const [showUserInfos, setShowUserInfos] = useState({ showModal: false, userInfos: null });

  // const scrollContainerRef = useRef(null);
  const suggestionsPageRef = useRef(1);
  const firstRender = useRef(true);

  /* Calcule les cards à afficher selon la largeur du viewport.
    width: 70px, gap: 7px, 3 cards en plus pour la marge
  */
  const cardsToShow = useCardsToShowHorizontal(70, 7, 3);  

  const loadUsers = async () => {
    try {
      console.log('chargement des utilisateurs...');

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
        console.log('plus aucun utilisateur a charger');
        
        setHasMore(false); // Fin des données d'utilisateurs
      }
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    } finally {
      // setAreUsersLoading(false);
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
    if (firstRender.current && cardsToShow && hasMore) {
      firstRender.current = false;
      loadUsers();
    }
  }, [cardsToShow, hasMore]);

  return (
    <>
      <Modal
        open={showUserInfos.showModal}
        onClose={() => setShowUserInfos({ showModal: false, userInfos: null })}
        aria-labelledby={'informations de l\'utilisateur'}
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95vw', // Vous pouvez ajuster la largeur selon vos besoins
          }}
        >
          <ContactsUserFeatures userInfos={showUserInfos.userInfos} />
        </Box>
      </Modal>
      <Stack 
        ref={scrollContainerRef}
        height='92.38px'
        direction='row' 
        whiteSpace='nowrap'
        columnGap='7px'
        sx={{
          minWidth: usersSuggestion.length * 77,
        }}
      >
      {usersSuggestion &&
        usersSuggestion.map((user, index) => {
          return(
            <Stack 
              key={user.id} 
              width='70px'
              rowGap='7px' 
              justifyContent='center' 
              alignItems='center'
              position='relative'
              flexShrink={0}
              onClick={() => setShowUserInfos({showModal: true, userInfos: user})}
            >
              <Badge 
                badgeContent={user.count_common_gold_nuggets} 
                showZero
                color='secondary'
                sx={{
                  '& .MuiBadge-badge': {
                    right: 0,
                    top: 10,
                    border: `2px solid`,
                    padding: '0 4px',
                  },
                }}
              >
                <Avatar 
                  alt={`photo de profil de ${user.first_name} ${user.last_name}`} 
                  src={
                    user.file_path ? 
                      `${apiBaseUrl}/Uploads/${user.file_path}`
                    : `${assetsBaseUrl}/images/default_profil_pic.png`
                    } 
                  sx={{
                    height: 60,
                    width: 60,
                    boxShadow: '0px 3px 3.7px rgba(0, 0, 0, 0.30)'
                  }}
                />
              </Badge>
              {
                index === 0 ?
                  <TopContributorIcon
                    color='#FFD700'
                    sx={{ 
                      position: 'absolute',
                      bottom: '23px'
                    }} 
                  />
                : index === 1 ?     
                  <TopContributorIcon
                    color='#C0C0C0'
                    sx={{ 
                      position: 'absolute',
                      bottom: '23px'
                    }} 
                  />  
                : index === 2 ?
                  <TopContributorIcon
                    color='#8D6D17'
                    sx={{ 
                      position: 'absolute',
                      bottom: '23px'
                    }} 
                  />  
                : null
              }
                  
              <Typography 
                fontSize='0.85em' 
                color='#737373' 
                fontWeight='300'
                whiteSpace='nowrap'
                letterSpacing='-0.4px'
                maxWidth='70px'
                overflow='hidden'
                textOverflow='ellipsis'
                marginBottom='5px'
              >
                {`${user.first_name} ${user.last_name.charAt(0)}.`}
              </Typography>
            </Stack>

          )
        })
      }
      {(isFetching || areUsersLoading) && hasMore &&
          [...Array(cardsToShow)].map((_, i) => (
            <Stack key={i} height="92.38px" alignItems="center" rowGap='6px'>
              <Skeleton
                variant="rectangular"
                width={60}
                height={60}
                animation="wave"
                sx={{
                  borderRadius: '50%',
                  bgcolor: '#1a999945'
                }}
              />
              <Skeleton
                variant='text'
                width='75%'
                sx={{
                  fontSize: '0.8em',
                  bgcolor: '#1a999945'
                }}
              />
            </Stack>
          ))}
      </Stack>
    </>
  );
};

export default TopContributors;