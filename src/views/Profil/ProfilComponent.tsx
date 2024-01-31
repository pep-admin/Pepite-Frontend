// Import des libs externes
import {
  Card,
  CardMedia,
  Container,
  Stack,
  Box,
  Avatar,
  Typography,
} from '@mui/material';
import Header from '@utils/Header';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import { Item } from '@utils/styledComponent';
import ProfilDetails from '@views/Profil/ProfilDetails';
import SuggestedGoldNuggets from '@views/Profil/SuggestedGoldNuggets';
import SearchBar from '@utils/SearchBar';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';
import AccountUpdatePic from '@views/Account/AccountUpdatePic';
import FriendRequestBtn from '@utils/FriendRequestBtn';
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';

// Import des icônes
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import MilitaryTechTwoToneIcon from '@mui/icons-material/MilitaryTechTwoTone';
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des variables d'environnements
import apiBaseUrl from '@utils/request/config';

// Import des requêtes
import { getUser } from '@utils/request/users/getUser';
import { getCriticsOfUser } from '@utils/request/critics/getCritics';
import { getAdvicesReceived } from '@utils/request/advices/getAdvicesReceived';

// Import du hook de scroll vertical infini
import useVerticalScroll from '@hooks/useVerticalScroll';

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
}

const ProfilComponent = () => {
  const { id } = useParams();
  const { displayType, chosenMovie } = useData();

  // Utilisateur connecté
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  // Utilisateur externe
  const [chosenUser, setChosenUser] = useState<User | null>(null);

  // const [userCritics, setUserCritics] = useState([]); // Toutes les critiques de l'utilisateur du profil
  // const [advicesReceived, setAdvicesReceived] = useState([]); // Tous les conseils reçus par l'utilisateur du profil
  const [criticsAndAdvices, setCriticsAndAdvices] = useState([]);
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites de l'utilisateur du profil
  const [modifyCoverPic, setModifyCoverPic] = useState({
    state: false,
    type: null,
  });
  const [anchorProfilBtn, setAnchorProfilBtn] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // Si les données ont été récupérées

  const firstRender = useRef(true);

  // const [alertSeverity, setAlertSeverity] = useState({state: null, message: null, action: null}); // Message de succès, d'info, d'erreur

  // Récupère les informations de l'utilisateur autres que l'utilisateur connecté
  const fetchChosenUser = async user_id => {
    const user = await getUser(user_id);
    setChosenUser(user);
  };

  // Récupère les critiques et conseils de l'utilisateur du profil
  const getCriticsAndAdvices = useCallback(
    async page => {
      try {
        let hasMoreCritics = true;
        let hasMoreAdvices = true;

        const criticsData = await getCriticsOfUser(id, displayType, page);
        if (criticsData.length < 3) {
          // Si les critiques reçues sont inférieures à 3
          hasMoreCritics = false;
        }
        // setUserCritics(criticsData);

        const advicesData = await getAdvicesReceived(id, displayType, page);
        if (advicesData.length < 3) {
          // Si les conseils reçus sont inférieurs à 3
          hasMoreAdvices = false;
        }

        const combinedData = [...criticsData, ...advicesData];
        setCriticsAndAdvices(prevData => [...prevData, ...combinedData]);

        setIsDataFetched(true);

        // Retourne true s'il reste des critiques ou des conseils à charger
        return hasMoreCritics || hasMoreAdvices;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    [id, displayType],
  );

  const { observerRef, loading, hasMore } = useVerticalScroll(
    firstRender,
    getCriticsAndAdvices,
    displayType,
    setCriticsAndAdvices,
    setIsDataFetched,
  );

  useEffect(() => {
    console.log('les critiques et conseils', criticsAndAdvices);
  }, [criticsAndAdvices]);

  // Récupération des informations de l'utilisateur si le profil est différent de l'utilisateur connecté
  useEffect(() => {
    const loggedInUserId = userInfos.id;
    const profileUserId = parseInt(id, 10);

    // Si l'id de l'utilisateur dans l'URL est différent de celui de l'utilisateur connecté
    if (loggedInUserId !== profileUserId) {
      // Fetch les informations de cet utilisateur
      fetchChosenUser(profileUserId);
    }
  }, [id, userInfos]);

  // Réinitialisation lors du changement de type (films ou séries)
  useEffect(() => {
    // Premier rendu
    if (firstRender.current) {
      firstRender.current = false;
      // Réinitialisation
    } else {
      // setUserCritics([]);
      // setAdvicesReceived([]);
    }
  }, [displayType, id]);

  const handleClick = event => {
    setAnchorProfilBtn(event.currentTarget);
  };

  return (
    <>
      {/* {alertSeverity.state ?
        <CustomAlert 
          type={alertSeverity.state} 
          message={alertSeverity.message} 
          setOnAlert={setAlertSeverity} 
          />
        :
        null
      } */}
      {modifyCoverPic.state ? (
        <AccountUpdatePic
          showPicModal={modifyCoverPic}
          setShowPicModal={setModifyCoverPic}
          userInfos={userInfos}
          setUserInfos={setUserInfos}
        />
      ) : null}
      <Header userInfos={userInfos} setUserInfos={setUserInfos} />
      <Card
        sx={{
          height: '30vh',
          width: '100%',
          position: 'relative',
          borderRadius: '0',
        }}
      >
        <CardMedia
          image={
            // Si profil de l'utilisateur connecté et qu'il a choisi une photo de couverture
            userInfos.id === parseInt(id, 10) && userInfos.coverPics.length
              ? `${apiBaseUrl}/uploads/${
                  userInfos.coverPics.find(pic => pic.isActive === 1).filePath
                }`
              : // Si profil d'un autre utilisateur et qu'il a choisi une photo de couverture
              userInfos.id !== parseInt(id, 10) && chosenUser?.coverPics.length
              ? `${apiBaseUrl}/uploads/${
                  chosenUser.coverPics.find(pic => pic.isActive === 1).filePath
                }`
              : // Si l'utilisateur n'a pas choisi de photo de couverture
                'http://127.0.0.1:5173/images/default_cover_pic_pietro_jeng.jpg'
          }
          sx={{
            height: '100%',
          }}
        />
        {/* Backround gradient pour la lisibilité du nom de l'utilisateur */}
        <Box
          width="100%"
          height="100%"
          position="absolute"
          bottom="0"
          right="0"
          sx={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(14,14,14,0.37) 70%)',
          }}
        >
          {
            // Si profil de l'utilisateur connecté, on permet de changer la photo de couverture
            userInfos.id === parseInt(id, 10) ? (
              <AddPhotoAlternateTwoToneIcon
                fontSize="medium"
                sx={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  color: '#585858',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  setModifyCoverPic({ state: true, type: 'couverture' })
                }
              />
            ) : null
          }
        </Box>
        <Box
          position="absolute"
          bottom="0"
          right="0"
          width="calc(100% - 108px)"
          display="flex"
          alignItems="center"
          columnGap="5px"
        >
          <Typography
            component="h2"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.4em',
              padding: '0 6px 0 16px',
              textShadow: '#00000040 1px 2px 2px',
            }}
          >
            {userInfos.id === parseInt(id, 10)
              ? `${userInfos.first_name} ${userInfos.last_name}`
              : chosenUser
              ? `${chosenUser.first_name} ${chosenUser.last_name}`
              : null}
          </Typography>
          {userInfos.id !== parseInt(id, 10) ? (
            <>
              <PersonAddAlt1TwoToneIcon
                sx={{
                  fontSize: '23.5px',
                  color: '#0e6666',
                  position: 'relative',
                  bottom: '1.1px',
                  cursor: 'pointer',
                }}
                onClick={e => handleClick(e)}
              />
              <FriendRequestBtn
                page={'profil'}
                anchorProfilBtn={anchorProfilBtn}
                setAnchorProfilBtn={setAnchorProfilBtn}
                receiverId={id}
              />
            </>
          ) : null}
        </Box>
      </Card>
      <Container
        maxWidth="xl"
        sx={{
          padding: '0 6px',
          backgroundColor: '#F4F4F4',
          minHeight: 'calc(100vh - (60px + 30vh))',
          marginBottom: '7px',
        }}
      >
        <Stack height="100%" position="relative">
          <Box
            width="100px"
            display="flex"
            justifyContent="center"
            position="absolute"
            top="-66px"
            left="0"
          >
            <Avatar
              alt={`Photo de profil de ${userInfos.first_name}`}
              src={
                // Si l'utilisateur affiché est celui connecté et qu'il a défini une photo de profil
                userInfos.id === parseInt(id, 10) && userInfos.profilPics.length
                  ? `${apiBaseUrl}/uploads/${
                      userInfos.profilPics.find(pic => pic.isActive === 1)
                        .filePath
                    }`
                  : // Si l'utilisateur affiché est un autre que celui connecté et qu'il a défini une photo de profil
                  userInfos.id !== parseInt(id, 10) &&
                    chosenUser?.profilPics.length
                  ? `${apiBaseUrl}/uploads/${
                      chosenUser.profilPics.find(pic => pic.isActive === 1)
                        .filePath
                    }`
                  : // Si l'utilisateur n'a pas défini de photo de profil
                    'http://127.0.0.1:5173/images/default_profil_pic.png'
              }
              sx={{
                width: 90,
                height: 90,
                outline: '3.5px solid #fff',
              }}
            />
          </Box>
          <Stack
            direction="column"
            height="189px"
            columnGap="6px"
            flexWrap="wrap"
          >
            <Box height="189px" width="100px">
              <Box
                position="relative"
                height="50px"
                width="100px"
                borderRadius="100px 100px 0 0"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                paddingTop="5px"
                sx={{ background: '#fff' }}
              >
                <MilitaryTechTwoToneIcon sx={{ color: '#8324A5' }} />
                <Typography
                  component="h4"
                  variant="body2"
                  sx={{
                    color: '#8324A5',
                    fontWeight: 'bold',
                    marginBottom: '2px',
                  }}
                >
                  {userInfos.id === parseInt(id, 10)
                    ? `${userInfos.rank}`
                    : `${chosenUser?.rank}`}
                </Typography>
              </Box>
              <Item
                customheight="calc(100% - 50px)"
                customwidth="100px"
                padding="7px"
                display="flex"
                flexdirection="column"
                borderradius="0 0 10px 10px"
              >
                <ProfilDetails
                  criticsAndAdvices={criticsAndAdvices}
                  // userCritics={userCritics}
                  userInfos={userInfos}
                  chosenUser={chosenUser}
                />
              </Item>
            </Box>
            <Item
              customheight="calc(100% - 6px)"
              customwidth="calc(100% - 108px)"
              margintop="6px"
              overflow="hidden"
            >
              <SuggestedGoldNuggets
                page={'profil'}
                // userCritics={userCritics}
                goldenMovies={goldenMovies}
                setGoldenMovies={setGoldenMovies}
                chosenUser={chosenUser}
                userInfos={userInfos}
              />
            </Item>
          </Stack>
          <SearchBar
            Item={Item}
            page={'profil'}
            userInfos={userInfos}
            chosenUser={chosenUser}
            handlePoster={null}
          />
          {chosenMovie !== null ? (
            <CriticAdvicesComponent
              page={'profil'}
              type={
                userInfos.id === parseInt(id, 10) ? 'new-critic' : 'new-advice'
              }
              chosenMovie={chosenMovie}
              // criticsAndAdvices={criticsAndAdvices}
              setData={setCriticsAndAdvices}
              // setUserCritics={setUserCritics}
              // setAdvicesReceived={setAdvicesReceived}
              setGoldenMovies={setGoldenMovies}
              infos={null}
              chosenUser={chosenUser}
            />
          ) : null}
          {criticsAndAdvices.length ? (
            criticsAndAdvices.map(infos => {
              return (
                <CriticAdvicesComponent
                  key={`${infos.type}-${infos.id}`}
                  page={'profil'}
                  type={infos.critic_id ? 'old-critic' : 'old-advice'}
                  // criticsAndAdvices={criticsAndAdvices}
                  setData={setCriticsAndAdvices}
                  // setUserCritics={setUserCritics}
                  // setAdvicesReceived={setAdvicesReceived}
                  setGoldenMovies={setGoldenMovies}
                  chosenMovie={null}
                  infos={infos}
                  chosenUser={chosenUser}
                />
              );
            })
          ) : !criticsAndAdvices.length && isDataFetched ? (
            <NoCriticAdvice page={'profil'} />
          ) : null}
          {loading && <SkeletonCard />}
          {hasMore && <div ref={observerRef}></div>}
        </Stack>
      </Container>
    </>
  );
};

export default ProfilComponent;
