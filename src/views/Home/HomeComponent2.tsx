import { useData } from '@hooks/DataContext';
import { Box, Container, Stack, Typography } from '@mui/material';
import ColoredRating from '@utils/components/ColoredRating';
import Header from '@utils/components/Header';
import SuggestedGoldNuggets2 from '@utils/components/SuggestedGoldNuggets2';
import { getAllCriticsOfAcquaintances } from '@utils/request/critics/getAllCriticsOfAcquaintances';
import ContactsSuggestions from '@views/Contacts/ContactsSuggestions';
import TopContributors from '@views/Contacts/TopContributors';
import SuggestedGoldNuggets from '@views/Profil/SuggestedGoldNuggets';
import React, { useState } from 'react';

const HomeComponent2 = () => {

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const { displayType } = useData();

  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur
  const [criticsOfAcquaintances, setCriticsOfAcquaintances] = useState([]); // Les critiques des connaissances de l'utilisateur
  const [isDataFetched, setIsDataFetched] = useState(false); // Si les données ont été récupérées

  const getCritics = async page => {
    console.log('recup des critiques');

    const critics = await getAllCriticsOfAcquaintances(
      loggedUserInfos.id,
      displayType,
      page,
    );

    setCriticsOfAcquaintances(existingCritics => [
      ...existingCritics,
      ...critics,
    ]);

    setIsDataFetched(true);

    // Return un booléen true si des données supplémentaires existent, sinon false
    return critics.length >= 5;
  };


  return (
    <>
      <Header page={'home'} loggedUserInfos={loggedUserInfos} />
      <Container
        maxWidth="xl"
        sx={{
          padding: '0 !important',
          margin: '0',
          backgroundColor: '#FDFDFD',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        <Stack direction="column">
          <Stack
            height='40vh'
            width='100vw'
            justifyContent='flex-end'
            paddingBottom='30px'
            rowGap='7px'
            sx={{
              backgroundImage: `linear-gradient(
                to top,
                rgba(1, 18, 18, 0.66) 0%, 
                rgba(1, 18, 18, 0) 100%
              ), url(https://facts.net/wp-content/uploads/2023/10/37-facts-about-the-movie-flight-1696660050.jpg)`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              maskImage: "url('/images/rounded_mask.svg')",
              maskSize: 'cover',
              maskRepeat: 'no-repeat',
              maskPosition: 'center center',
            }}
          >
            <Typography 
              component='h2' 
              align='center'
              fontWeight='800'
              fontSize='7vh'
              color='primary'
              letterSpacing='-2px'
              lineHeight='normal'
              sx={{
                textShadow: '#01121282 -4px 4px 0'
              }}
            >
                {'À la une !'}
            </Typography>
            <Typography 
              component='h2' 
              align='center'
              fontWeight='100'
              fontSize='5vh'
              color='primary'
              letterSpacing='-2px'
              lineHeight='normal'
            >
                {'Flight'}
            </Typography>
          </Stack>
          <Stack alignItems='center' position='relative' bottom='23px'>
            <Stack 
              direction='row' 
              justifyContent='center' 
              alignItems='center' 
              bgcolor='#434343'
              width='150px'
              height='35px'
              border='2px solid #fff'
              borderRadius='10px'
              boxShadow='0px 2px 5px rgba(0, 0, 0, 0.2)'
            >
              <ColoredRating color='#E7AE1A' emptyColor='#E3E3E3' value={4.5} readOnly={true} precision={0.1} />
              <Typography variant='body2' color='primary' lineHeight='normal'>
                4.5 / 5
              </Typography>
            </Stack>
          </Stack>
          <Stack marginTop='-10px' marginBottom='5px' padding='0 5%'>
            <Stack>
              <Typography 
                component='h4' 
                variant='body2' 
                fontWeight='600'
                color='#383838'  
              >
                {'Top 20 - Contributeurs de la semaine'}
              </Typography>
            </Stack>
          </Stack>
          <Stack 
            margin='5px 0 5px 5%' 
            sx={{
              overflowX: 'scroll',
            }}
          >
            <TopContributors />
          </Stack>
          <Stack marginTop='0px' padding='0 5%'>
            <Stack>
              <Typography 
                component='h4' 
                variant='body2' 
                fontWeight='600'
                color='#383838'  
              >
                {'Dernières pépites de vos contacts'}
              </Typography>
            </Stack>
          </Stack>
          <Box 
            width='100vw' 
            height='100vh'
            marginTop='10vh'
            bgcolor='#CAE6E4'
            position='relative'
          >
            <SuggestedGoldNuggets2
              page={'home'}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              loggedUserInfos={loggedUserInfos}
              // chosenUser={chosenUser}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default HomeComponent2;