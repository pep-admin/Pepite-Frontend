// Import des libs externes
import { useEffect, useRef, useState } from 'react';
import { Box, Container, Modal, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

// Import des composants internes
import Header from '@utils/components/Header';
import TopContributors from '@views/Contacts/TopContributors';
import SuggestedGoldNuggets2 from '@utils/components/SuggestedGoldNuggets2';
import SearchBar2 from '@utils/components/SearchBar2';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';
import ColoredRating from '@utils/components/ColoredRating';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import du hook de scroll vertical infini
import useVerticalScroll from '@hooks/useVerticalScroll';

// Import des requêtes
import { getAllCriticsOfAcquaintances } from '@utils/request/critics/getAllCriticsOfAcquaintances';

const HomeComponent2 = () => {

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const { displayType, chosenMovie, setChosenMovie } = useData();
  const { id } = useParams();

  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur
  const [criticsOfAcquaintances, setCriticsOfAcquaintances] = useState([]); // Les critiques des connaissances de l'utilisateur
  const [isDataFetched, setIsDataFetched] = useState(false); // Si les données ont été récupérées

  const firstRender = useRef(true);
  const scrollContainerRef = useRef(null);

  const getCritics = async page => {

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

  const { observerRef, loading, hasMore } = useVerticalScroll(
    id,
    firstRender,
    getCritics,
    displayType,
    setCriticsOfAcquaintances,
    setIsDataFetched,
  );

  return (
    <>
      <Header page={'home'} />
      <Modal
        open={chosenMovie !== null}
        onClose={() => setChosenMovie(null)}
        aria-labelledby={
          loggedUserInfos.id === parseInt(id, 10)
            ? 'Nouvelle critique'
            : 'Nouveau conseil'
        }
        aria-describedby="modal-modal-description"
      >
        <Stack height="100vh" padding="0 6px" justifyContent="center">
          <CriticAdvicesComponent
            page={'home'}
            type={'new-critic'}
            chosenMovie={chosenMovie}
            data={criticsOfAcquaintances}
            setData={setCriticsOfAcquaintances}
            setGoldenMovies={setGoldenMovies}
            loggedUserInfos={loggedUserInfos}
            chosenUser={null}
            infos={null}
            haveMoreCritics={null}
            isLast={null}
          />
        </Stack>
      </Modal>
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
            <Stack width='100vw' position='fixed'>
              <Typography 
                component='h2' 
                align='center'
                fontWeight='800'
                fontSize='7vh'
                color='primary'
                letterSpacing='-2px'
                lineHeight='normal'
                marginBottom='10px'
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
          <Stack marginTop='-10px' padding='0 4%'>
            <Stack>
              <Typography 
                component='h4' 
                variant='body2' 
                fontWeight='600'
                color='#383838'  
              >
                {'Personnes suggérées - Pépites en commun'}
              </Typography>
            </Stack>
          </Stack>
          <Stack 
            ref={scrollContainerRef}
            margin='5px 0 15px 4%' 
            sx={{
              overflowX: 'scroll',
            }}
          >
            <TopContributors scrollContainerRef={scrollContainerRef} />
          </Stack>
          <Stack padding='0 4%'>
            <Typography 
              component='h4' 
              variant='body2' 
              fontWeight='600'
              color='#383838'  
            >
              {'Dernières pépites de vos contacts'}
            </Typography>
          </Stack>
          <Box 
            width='100vw' 
            marginTop='66px'
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
            <Stack padding='0 4%' marginTop='80px'>
              <Stack>
                <Typography 
                  component='h4' 
                  variant='body2' 
                  fontWeight='600'
                  color='#383838'  
                >
                  {'Publier une critique'}
                </Typography>
              </Stack>
              <SearchBar2 page={'home'} loggedUserInfos={loggedUserInfos}  />
            </Stack>
            <Stack padding='0 4%' marginTop='20px'>
              <Stack marginBottom='6px'>
                <Typography 
                  component='h4' 
                  variant='body2' 
                  fontWeight='600'
                  color='#383838'  
                >
                  {'Fil d\'actualité'}
                </Typography>
              </Stack>
              {criticsOfAcquaintances.length ? (
                criticsOfAcquaintances.map((critic, index) => {
                  return (
                    <CriticAdvicesComponent
                      key={index}
                      page={'home'}
                      type={'old-critic'}
                      data={criticsOfAcquaintances}
                      setData={setCriticsOfAcquaintances}
                      setGoldenMovies={setGoldenMovies}
                      chosenMovie={null}
                      infos={critic}
                      loggedUserInfos={loggedUserInfos}
                      chosenUser={null}
                      haveMoreCritics={hasMore}
                      isLast={criticsOfAcquaintances.length - 1 === index}
                    />
                  );
                })
              ) : !criticsOfAcquaintances.length && isDataFetched ? (
                <NoCriticAdvice page={'home'} />
              ) : null}
            </Stack>
            {loading && <SkeletonCard />}
            {hasMore && <div ref={observerRef}></div>}
          </Box>
          
        </Stack>
      </Container>
    </>
  );
};

export default HomeComponent2;