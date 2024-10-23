import { Box, Container, Stack } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { getCoverPic } from '@utils/functions/getCoverPic';
import ProfilPresentation from './ProfilPresentation';
import ProfilRequestButtons from './ProfilRequestButtons';
import ProfilAdditionalInfos from './ProfilAdditionalInfos';
import ProfilTopMovies from './ProfilTopMovies';
import ProfilGoldList from './ProfilGoldList';
import ProfilReviews from './ProfilReviews';
import { useRef } from 'react';
import AddReviewBtn from '@utils/components/AddReviewBtn';

const ProfilComponent2 = ({ isProfilLoggedUser, userInfos, additionalInfos }) => {

  const containerRef = useRef(null);
    
  return (
    <>
      <Box 
        ref={containerRef}
        height='auto'
        minHeight='100vh' 
        width='100vw' 
        bgcolor='#011212'
      >
        <Header2 page={'profil'} isTrailerFullscreen={null} />
        <Box
          sx={{
          position: 'relative', // Important pour que l'enfant pseudo-élément se positionne par rapport à cet élément
          height: '40vh',
          width: '100vw',
          backgroundImage: `url(${getCoverPic(userInfos)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
            '&::before': {
              content: '""', // Nécessaire pour créer le pseudo-élément
              position: 'absolute', // Positionnement absolu par rapport à l'élément parent
              bottom: '-1px',
              left: 0,
              width: '100%',
              height: '101%',
              background: 'linear-gradient(180deg, rgba(1,18,18,0.42) 0%, rgba(1,18,18,0.40) 80%, rgba(1,18,18,1) 100%)',
              zIndex: 1, // Met le pseudo-élément au-dessus de l'image de fond
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
        <Box
          bgcolor='#021E1E'
        >
          <Container
            sx={{
              paddingLeft: '5vw',
              paddingRight: '5vw'
            }}
          >
            <ProfilGoldList 
              isProfilLoggedUser={isProfilLoggedUser} 
              userInfos={userInfos}  
            />
          </Container>
        </Box>
        <Box
          bgcolor='#021818'
        >
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
      </Box>
      <AddReviewBtn containerRef={null} />
    </>
    
  );
};

export default ProfilComponent2;