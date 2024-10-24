import { Box, Container, Stack } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { getCoverPic } from '@utils/functions/getCoverPic';
import ProfilPresentation from './ProfilPresentation';
import ProfilRequestButtons from './ProfilRequestButtons';
import ProfilAdditionalInfos from './ProfilAdditionalInfos';
import ProfilTopMovies from './ProfilTopMovies';
import ProfilGoldList from './ProfilGoldList';
import ProfilReviews from './ProfilReviews';
import { useEffect, useRef, useState } from 'react';
import AddReviewBtn from '@utils/components/AddReviewBtn';
import { getGoldNuggetsOfUserRequest } from '@utils/request/goldNugget/getGoldNuggetsOfUserRequest';

const ProfilComponent2 = ({ isProfilLoggedUser, userInfos, additionalInfos }) => {

  const [goldNuggetsMovies, setGoldNuggetsMovies] = useState([]); // Toutes les pépites de l'utilisateur
  const [hasFetchedGoldNuggets, setHasFetchedGoldNuggets] = useState(false); // Pour éviter de déclencher plusieurs fois

  const goldListRef = useRef(null); // Référence pour le composant ProfilGoldList

  // Fonction pour récupérer les films "pépite" de l'utilisateur
  const getGoldNuggetsOfUser = async() => {
    try {
      const goldNuggets = await getGoldNuggetsOfUserRequest(
        'movie',
        userInfos.id,
      );
      setGoldNuggetsMovies(goldNuggets);
      setHasFetchedGoldNuggets(true); // Marquer comme récupéré
      console.log('les pépites =>', goldNuggets);
    } catch (error) {
      console.log(error);
    }
  };

  // Intersection Observer pour déclencher getGoldNuggetsOfUser
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasFetchedGoldNuggets) {
          getGoldNuggetsOfUser();
        }
      },
      { threshold: 0.1 } // Se déclenche lorsque 10% du composant est visible
    );

    if (goldListRef.current) {
      observer.observe(goldListRef.current);
    }

    return () => {
      if (goldListRef.current) {
        observer.unobserve(goldListRef.current);
      }
    };
  }, [hasFetchedGoldNuggets]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: '40vh',
          width: '100vw',
          backgroundImage: `url(${getCoverPic(userInfos)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            width: '100%',
            height: '101%',
            background: 'linear-gradient(180deg, rgba(1,18,18,0.42) 0%, rgba(1,18,18,0.40) 80%, rgba(1,18,18,1) 100%)',
            zIndex: 1,
          },
        }}  
      />
      <Container
        sx={{
          position: 'relative',
          zIndex: '2',
          paddingLeft: '5vw',
          paddingRight: '5vw'
        }}
      >
        <Stack spacing={6}>
          <ProfilPresentation 
            userInfos={userInfos} 
            additionalInfos={additionalInfos}
          />
          { !isProfilLoggedUser && <ProfilRequestButtons /> }
          <ProfilAdditionalInfos additionalInfos={additionalInfos} />
          <ProfilTopMovies />
        </Stack>
      </Container>
      <Box bgcolor='#021E1E'>
        <Container
          sx={{
            paddingLeft: '5vw',
            paddingRight: '5vw'
          }}
        >
          <div ref={goldListRef}> {/* Référence pour observer ProfilGoldList */}
            <ProfilGoldList 
              isProfilLoggedUser={isProfilLoggedUser} 
              userInfos={userInfos}  
              goldNuggetsMovies={goldNuggetsMovies}
            />
          </div>
        </Container>
      </Box>
      <Box bgcolor='#021818'>
        <Container
          sx={{
            paddingLeft: '5vw',
            paddingRight: '5vw'
          }}
        >
          <ProfilReviews
            isProfilLoggedUser={isProfilLoggedUser} 
            userInfos={userInfos}  
          />
        </Container>
      </Box>
      <AddReviewBtn containerRef={null} />
    </>
  );
};

export default ProfilComponent2;
