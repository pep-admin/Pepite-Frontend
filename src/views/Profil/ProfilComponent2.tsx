import { Box, Container, Stack } from '@mui/material';
import { getCoverPic } from '@utils/functions/getCoverPic';
import ProfilPresentation from './ProfilPresentation';
import ProfilRequestButtons from './ProfilRequestButtons';
import ProfilAdditionalInfos from './ProfilAdditionalInfos';
import ProfilTopMovies from './ProfilTopMovies';
import ProfilGoldList from './ProfilGoldList';
import ProfilReviews from './ProfilReviews';
import { useEffect, useRef, useState } from 'react';
import AddReviewBtn from '@utils/components/Buttons/AddReviewBtn';
import { getGoldNuggetsOfUserRequest } from '@utils/request/goldNugget/getGoldNuggetsOfUserRequest';
import { getCriticsOfUserRequest } from '@utils/request/critics/getCriticsOfUserRequest';

const ProfilComponent2 = ({ isProfilLoggedUser, userInfos, additionalInfos }) => {
  const [goldNuggetsMovies, setGoldNuggetsMovies] = useState([]);
  const [hasFetchedGoldNuggets, setHasFetchedGoldNuggets] = useState(false);
  const [criticsMovies, setCriticsMovies] = useState([]);
  const [hasFetchedCritics, setHasFetchedCritics] = useState(false);

  const goldListRef = useRef(null);
  const reviewsRef = useRef(null);

  const getGoldNuggetsOfUser = async () => {
    try {
      const goldNuggets = await getGoldNuggetsOfUserRequest('all', userInfos.id);
      setGoldNuggetsMovies(goldNuggets);
      setHasFetchedGoldNuggets(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getCriticsOfUser = async () => {
    try {
      const critics = await getCriticsOfUserRequest('all', userInfos.id);
      setCriticsMovies(critics);
      setHasFetchedCritics(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const goldObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFetchedGoldNuggets) {
          console.log('chargement des pépites !');      
          getGoldNuggetsOfUser();
        }
      },
      { threshold: 0.1 }
    );

    const reviewsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFetchedCritics) {
          console.log('chargement des critiques !');
          getCriticsOfUser();
        }
      },
      { threshold: 0.1 }
    );

    if (goldListRef.current) {
      goldObserver.observe(goldListRef.current);
    }
    if (reviewsRef.current) {
      reviewsObserver.observe(reviewsRef.current);
    }

    return () => {
      if (goldListRef.current) goldObserver.unobserve(goldListRef.current);
      if (reviewsRef.current) reviewsObserver.unobserve(reviewsRef.current);
    };
  }, [hasFetchedGoldNuggets, hasFetchedCritics]);

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
      <Container sx={{ position: 'relative', zIndex: '2', paddingLeft: '5vw', paddingRight: '5vw' }}>
        <Stack spacing={6}>
          <ProfilPresentation userInfos={userInfos} />
          {!isProfilLoggedUser && <ProfilRequestButtons />}
          <ProfilAdditionalInfos additionalInfos={additionalInfos} />
          <ProfilTopMovies />
        </Stack>
      </Container>
      <Box bgcolor='#021E1E'>
        <Container sx={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
          <div ref={goldListRef}>
            <ProfilGoldList 
              isProfilLoggedUser={isProfilLoggedUser} 
              userInfos={userInfos} 
              goldNuggetsCount={additionalInfos.goldsNumber}
              goldNuggetsMovies={goldNuggetsMovies} 
            />
          </div>
        </Container>
      </Box>
      <Box bgcolor='#021818'>
        <Container sx={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
          <div ref={reviewsRef}>
            <ProfilReviews 
              isProfilLoggedUser={isProfilLoggedUser} 
              userInfos={userInfos} 
              criticsCount={additionalInfos.criticsNumber}
              criticsMovies={criticsMovies} 
            />
          </div>
        </Container>
      </Box>
      <AddReviewBtn containerRef={null} />
    </>
  );
};

export default ProfilComponent2;
