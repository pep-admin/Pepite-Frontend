// Import des libs externes
import { Box, Container, Snackbar, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import Header from '@utils/components/Header';
import UserAvatar from '@utils/components/UserAvatar';
import ProfilRank from '@views/Profil/ProfilRank';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import GradientBtn from '@views/CriticAdvices/GradientBtn';
import SuggestedGoldNuggets from '@utils/components/SuggestedGoldNuggets';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';
import ProfilInputChoice from './ProfilInputChoice';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import du hook de scroll vertical infini
import useVerticalScroll from '@hooks/useVerticalScroll';

// Import des requêtes
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import { getUser } from '@utils/request/users/getUser';
import { countCriticsAndGoldUser } from '@utils/functions/countCriticsAndGoldUser';
import { getCriticsAdvices } from '@utils/functions/criticsAdvicesActions';

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

const ProfilComponent = () => {
  const { displayType } = useData();
  const { id } = useParams();

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const isProfilUserLogged = loggedUserInfos.id === parseInt(id, 10); // Vérifie si le profil affiché est celui de l'utilisateur connecté

  const [criticsAndAdvices, setCriticsAndAdvices] = useState([]); // Les critiques et les conseils de l'utilisateur du profil
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites de l'utilisateur du profil
  const [chosenUser, setChosenUser] = useState<User | null>(null); // Les informations de l'utilisateur autre que celui connecté
  const [isChosenUserLoaded, setIsChosenUserLoaded] = useState(false); // Etat de chargement des informations de l'utilisateur extérieur
  const [criticsNumber, setCriticsNumber] = useState(0); // Le nombre de critiques de l'utilisateur du profil
  const [goldNuggetsNumber, setGoldNuggetsNumber] = useState(0); // Le nombre de pépites de l'utilisateur du profil
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const openSnackbar = message => {
    setSnackbar({ open: true, message });
  };

  const firstRender = useRef(true);

  // Récupération de la photo de couverture
  const getCoverPic = () => {
    // Si profil de l'utilisateur connecté et qu'une photo de couverture a été choisie
    if (isProfilUserLogged && loggedUserInfos.coverPics.length) {
      return `${apiBaseUrl}/uploads/${
        loggedUserInfos.coverPics.find(pic => pic.isActive === 1).filePath
      }`;
    }
    // Si profil d'un autre utilisateur et qu'une photo de couverture a été choisie
    else if (!isProfilUserLogged && chosenUser?.coverPics.length) {
      return `${apiBaseUrl}/uploads/${
        chosenUser.coverPics.find(pic => pic.isActive === 1).filePath
      }`;
    }
    // Si aucune photo de couverture n'a été choisie
    else {
      return `${assetsBaseUrl}/images/default_cover_pic_pietro_jeng.jpg`;
    }
  };

  // Récupère les informations de l'utilisateur autres que l'utilisateur connecté
  const fetchChosenUser = async user_id => {
    setIsChosenUserLoaded(false);
    const user = await getUser(user_id);
    setChosenUser(user);
    setIsChosenUserLoaded(true);
  };

  // Hook customisé pour le scroll infini vertical
  const { observerRef, loading, hasMore } = useVerticalScroll(
    id,
    firstRender,
    getCriticsAdvices,
    displayType,
    setCriticsAndAdvices,
  );

  // Compte le nombre de critiques et le nombre de pépites de l'utilisateur
  useEffect(() => {
    const fetchCounts = async () => {
      const { criticsNumber, goldNuggetsNumber } =
        await countCriticsAndGoldUser(id);
      setCriticsNumber(criticsNumber);
      setGoldNuggetsNumber(goldNuggetsNumber);
    };

    fetchCounts();
  }, [id, criticsAndAdvices]);

  useEffect(() => {
    if (!isProfilUserLogged) {
      fetchChosenUser(id);
    }

    firstRender.current = false;
  }, [id]);

  useEffect(() => {
    console.log('les conseils et critiques =>', criticsAndAdvices);
  }, [criticsAndAdvices]);

  return (
    <>
      <Header page={'profil'} />
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
          <Stack position="relative">
            <Box
              height="40vh"
              width="100vw"
              justifyContent="flex-end"
              sx={{
                backgroundImage: `url(${getCoverPic()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: "url('/images/rounded_mask.svg')",
                maskSize: 'cover',
                maskRepeat: 'no-repeat',
                maskPosition: 'center center',
              }}
            ></Box>
            <Stack
              alignItems="center"
              width="100vw"
              position="absolute"
              bottom="-45px"
              zIndex="2"
            >
              <GradientBtn
                btnType={'movies-list'}
                criticsNumber={null}
                goldNuggetsNumber={null}
              />
              <Stack direction="row" alignItems="center" columnGap="9vw">
                <GradientBtn
                  btnType={'ratings'}
                  criticsNumber={criticsNumber}
                  goldNuggetsNumber={goldNuggetsNumber}
                />
                {(isProfilUserLogged || isChosenUserLoaded) && (
                  <UserAvatar
                    variant={'circular'}
                    userInfos={
                      isProfilUserLogged ? loggedUserInfos : chosenUser
                    }
                    picWidth={120}
                    picHeight={120}
                    isOutlined={true}
                    outlineWidth={'5px'}
                    relationType={'default'}
                    sx={{
                      boxShadow: '0px 8px 5px 0px rgb(57 57 57 / 14%)',
                    }}
                    redirection={false}
                  />
                )}
                <GradientBtn
                  btnType={'gold-nuggets'}
                  criticsNumber={criticsNumber}
                  goldNuggetsNumber={goldNuggetsNumber}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems="center" marginTop="52px">
            <Typography
              component="h2"
              fontWeight="600"
              color="#383838"
              fontSize="4vh"
              letterSpacing="-1px"
              lineHeight="1"
              margin="7px 0 4px 0"
            >
              {isProfilUserLogged
                ? `${loggedUserInfos.first_name} ${loggedUserInfos.last_name}`
                : isChosenUserLoaded
                ? `${chosenUser.first_name} ${chosenUser.last_name}`
                : null}
            </Typography>
            <ProfilRank page={'profil'} criticsNumber={criticsNumber} />
          </Stack>
          <Stack padding="0 4%" margin="20px 0 0 0">
            <Typography
              component="h4"
              variant="body1"
              fontWeight="600"
              color="#383838"
            >
              {isProfilUserLogged
                ? 'Vos dernières pépites'
                : isChosenUserLoaded
                ? `Dernières pépites de ${chosenUser.first_name} ${chosenUser.last_name}`
                : null}
            </Typography>
          </Stack>
          <Box
            width="100vw"
            marginTop="64px"
            bgcolor="#CAE6E4"
            position="relative"
          >
            <SuggestedGoldNuggets
              page={'profil'}
              loggedUserInfos={loggedUserInfos}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              chosenUser={chosenUser}
            />
            <ProfilInputChoice
              page={'profil'}
              isProfilUserLogged={isProfilUserLogged}
              loggedUserInfos={loggedUserInfos}
              chosenUser={chosenUser}
              setChosenUser={setChosenUser}
              criticsAndAdvices={criticsAndAdvices}
              setCriticsAndAdvices={setCriticsAndAdvices}
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
                  {isProfilUserLogged
                    ? "Votre fil d'actualité"
                    : `Fil d'actualité de ${chosenUser?.first_name} ${chosenUser?.last_name} `}
                </Typography>
              </Stack>
              {criticsAndAdvices.length ? (
                criticsAndAdvices.map((infos, index) => {
                  return (
                    <CriticAdvicesComponent
                      key={`${infos.type}-${infos.id}`}
                      criticIndex={index}
                      page={'profil'}
                      type={infos.critic_id ? 'old-critic' : 'old-advice'}
                      data={criticsAndAdvices}
                      setData={setCriticsAndAdvices}
                      setGoldenMovies={setGoldenMovies}
                      chosenMovie={null}
                      loggedUserInfos={loggedUserInfos}
                      infos={infos}
                      chosenUser={chosenUser}
                      inputChoice={null}
                      openSnackbar={openSnackbar}
                    />
                  );
                })
              ) : !criticsAndAdvices.length && !loading ? (
                <NoCriticAdvice page={'profil'} />
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

export default ProfilComponent;
