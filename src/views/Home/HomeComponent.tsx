// Import des libs externes
import { useEffect, useRef, useState } from 'react';
import { Box, Container, Snackbar, Stack, Typography } from '@mui/material';

// Import des composants internes
import Header from '@utils/components/Header';
import TopContributors from '@views/Contacts/TopContributors';
import SuggestedGoldNuggets2 from '@utils/components/SuggestedGoldNuggets';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';
import ColoredRating from '@utils/components/ColoredRating';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import du hook de scroll vertical infini
import useVerticalScroll from '@hooks/useVerticalScroll';

// Import des requêtes
import ProfilInputChoice from '@views/Profil/ProfilInputChoice';
import { getCriticsAndUserInfos } from '@utils/functions/criticsAdvicesActions';

interface Picture {
  id: number;
  user_id: number;
  filePath: string;
  uploaded_at: string;
  isActive: number;
}

interface User {
  coverPics: Picture[];
  create_datetime: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  last_login_date: string;
  profilPics: Picture[];
  rank: string;
  relation_type: string;
}

const HomeComponent = () => {
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const { displayType } = useData();

  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur
  const [criticsOfAcquaintances, setCriticsOfAcquaintances] = useState([]); // Les critiques des connaissances de l'utilisateur
  const [chosenUser, setChosenUser] = useState<User | null>(null); // Les informations de l'utilisateur autre que celui connecté
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const openSnackbar = message => {
    setSnackbar({ open: true, message });
  };

  const firstRender = useRef(true);
  const scrollContainerRef = useRef(null);

  const { observerRef, loading, hasMore } = useVerticalScroll(
    loggedUserInfos.id,
    firstRender,
    getCriticsAndUserInfos,
    displayType,
    setCriticsOfAcquaintances,
  );

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <>
      <Header page={'home'} />
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
            height="40vh"
            width="100vw"
            justifyContent="flex-end"
            paddingBottom="30px"
            rowGap="7px"
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
            <Stack width="100vw" position="fixed">
              <Typography
                component="h2"
                align="center"
                fontWeight="800"
                fontSize="7vh"
                color="primary"
                letterSpacing="-2px"
                lineHeight="normal"
                marginBottom="10px"
                sx={{
                  textShadow: '#01121282 -4px 4px 0',
                }}
              >
                {'À la une !'}
              </Typography>
              <Typography
                component="h2"
                align="center"
                fontWeight="100"
                fontSize="5vh"
                color="primary"
                letterSpacing="-2px"
                lineHeight="normal"
              >
                {'Flight'}
              </Typography>
            </Stack>
          </Stack>
          <Stack alignItems="center" position="relative" bottom="23px">
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              bgcolor="#434343"
              width="150px"
              height="35px"
              border="2px solid #fff"
              borderRadius="10px"
              boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
            >
              <ColoredRating
                color="#E7AE1A"
                emptyColor="#E3E3E3"
                value={4.5}
                readOnly={true}
                precision={0.1}
              />
              <Typography variant="body2" color="primary" lineHeight="normal">
                4.5 / 5
              </Typography>
            </Stack>
          </Stack>
          <Stack marginTop="-10px" padding="0 4%">
            <Stack>
              <Typography
                component="h4"
                variant="body1"
                fontWeight="600"
                color="#383838"
              >
                {'Personnes suggérées - Pépites en commun'}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            ref={scrollContainerRef}
            margin="5px 0 15px 4%"
            sx={{
              overflowX: 'scroll',
            }}
          >
            <TopContributors
              page={'home'}
              scrollContainerRef={scrollContainerRef}
              getFriendsRequests={null}
              getFriends={null}
              getFollowed={null}
            />
          </Stack>
          <Stack padding="0 4%">
            <Typography
              component="h4"
              variant="body1"
              fontWeight="600"
              color="#383838"
            >
              {'Dernières pépites de vos contacts'}
            </Typography>
          </Stack>
          <Box
            width="100vw"
            marginTop="66px"
            bgcolor="#CAE6E4"
            position="relative"
          >
            <SuggestedGoldNuggets2
              page={'home'}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              loggedUserInfos={loggedUserInfos}
              chosenUser={chosenUser}
            />
            <ProfilInputChoice
              page={'home'}
              isProfilUserLogged={true}
              loggedUserInfos={loggedUserInfos}
              chosenUser={chosenUser}
              setChosenUser={setChosenUser}
              criticsAndAdvices={criticsOfAcquaintances}
              setCriticsAndAdvices={setCriticsOfAcquaintances}
              setGoldenMovies={setGoldenMovies}
              openSnackbar={openSnackbar}
            />
            <Stack padding="0 4%" marginTop="20px">
              <Stack marginBottom="6px">
                <Typography
                  component="h4"
                  variant="body1"
                  fontWeight="600"
                  color="#383838"
                >
                  {"Fil d'actualité"}
                </Typography>
              </Stack>
              {criticsOfAcquaintances.length ? (
                criticsOfAcquaintances.map((critic, index) => {
                  return (
                    <CriticAdvicesComponent
                      key={index}
                      criticIndex={index}
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
                      inputChoice={null}
                      openSnackbar={openSnackbar}
                    />
                  );
                })
              ) : !criticsOfAcquaintances.length && !loading ? (
                <NoCriticAdvice page={'home'} />
              ) : null}
              {loading && (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              )}
            </Stack>
            {hasMore && !loading && <div ref={observerRef}></div>}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default HomeComponent;
