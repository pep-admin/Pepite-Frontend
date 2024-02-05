// Import des libs externes
import {
  Card,
  CardMedia,
  Container,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import Header from '@utils/components/Header';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import { Item } from '@utils/components/styledComponent';
import ProfilDetails from '@views/Profil/ProfilDetails';
import SuggestedGoldNuggets from '@views/Profil/SuggestedGoldNuggets';
import SearchBar from '@utils/components/SearchBar';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';
import AccountUpdatePic from '@views/Account/AccountUpdatePic';
import FriendRequestBtn from '@utils/components/FriendRequestBtn';
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';

// Import des icônes
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';
import VerifiedIcon from '@mui/icons-material/Verified';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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
import UserAvatar from '@utils/components/UserAvatar';

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
  const { id } = useParams();
  const { displayType, chosenMovie } = useData();

  // Utilisateur connecté
  const [loggedUserInfos, setLoggedUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  // Utilisateur externe
  const [chosenUser, setChosenUser] = useState<User | null>(null); // Les informations de l'utilisateur autre que celui connecté
  const [isChosenUserLoaded, setIsChosenUserLoaded] = useState(false); // Etat de chargement des informations de l'utilisateur extérieur
  const [criticsAndAdvices, setCriticsAndAdvices] = useState([]); // Les critiques et les conseils de l'utilisateur du profil
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites de l'utilisateur du profil
  const [modifyCoverPic, setModifyCoverPic] = useState({
    state: false,
    type: null,
  }); // Booléen pour ouvrir ou non la fenêtre de modification de photo de couverture
  const [anchorProfilBtn, setAnchorProfilBtn] = useState(null); // Booléen pour ouvrir le Menu de demande en ami
  const [isDataFetched, setIsDataFetched] = useState(false); // Si les critiques et conseils ont été récupérés

  const firstRender = useRef(true);

  // const [alertSeverity, setAlertSeverity] = useState({state: null, message: null, action: null}); // Message de succès, d'info, d'erreur

  // Récupère les informations de l'utilisateur autres que l'utilisateur connecté
  const fetchChosenUser = async user_id => {
    setIsChosenUserLoaded(false);
    const user = await getUser(user_id);
    setChosenUser(user);
    setIsChosenUserLoaded(true);
  };

  // Récupère les critiques et conseils de l'utilisateur du profil
  const getCriticsAndAdvices = useCallback(
    async page => {
      try {
        console.log('APPEL !!!');

        setIsDataFetched(false);

        let hasMoreCritics = true;
        let hasMoreAdvices = true;

        const criticsData = await getCriticsOfUser(id, displayType, page);
        if (criticsData.length < 3) {
          console.log('plus de critiques à récupérer');

          // Si les critiques reçues sont inférieures à 3
          hasMoreCritics = false;
        }
        console.log('les critiques', criticsData);

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
    id,
    firstRender,
    getCriticsAndAdvices,
    displayType,
    setCriticsAndAdvices,
    setIsDataFetched,
  );

  // useEffect(() => {
  //   console.log('les critiques et conseils', criticsAndAdvices);
  // }, [criticsAndAdvices]);

  // Récupération des informations de l'utilisateur si le profil est différent de l'utilisateur connecté
  useEffect(() => {
    const loggedInUserId = loggedUserInfos.id;
    const profileUserId = parseInt(id, 10);

    // Si l'id de l'utilisateur dans l'URL est différent de celui de l'utilisateur connecté
    if (loggedInUserId !== profileUserId) {
      // Fetch les informations de cet utilisateur
      fetchChosenUser(profileUserId);
    }
  }, [id, loggedUserInfos]);

  // Réinitialisation lors du changement de type (films ou séries)
  useEffect(() => {
    // Premier rendu
    if (firstRender.current) firstRender.current = false;
  }, []);

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
          loggedUserInfos={loggedUserInfos}
          setLoggedUserInfos={setLoggedUserInfos}
        />
      ) : null}
      <Header loggedUserInfos={loggedUserInfos} />
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
            loggedUserInfos.id === parseInt(id, 10) &&
            loggedUserInfos.coverPics.length
              ? `${apiBaseUrl}/uploads/${
                  loggedUserInfos.coverPics.find(pic => pic.isActive === 1)
                    .filePath
                }`
              : // Si profil d'un autre utilisateur et qu'il a choisi une photo de couverture
              loggedUserInfos.id !== parseInt(id, 10) &&
                chosenUser?.coverPics.length
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
            loggedUserInfos.id === parseInt(id, 10) ? (
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
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
          position="absolute"
          bottom="0"
          right="0"
          width="100%"
          padding="0 9.5px"
          marginBottom="6px"
        >
          {(loggedUserInfos.id === parseInt(id, 10) || isChosenUserLoaded) && (
            <UserAvatar
              variant={'rounded'}
              userInfos={
                loggedUserInfos.id === parseInt(id, 10)
                  ? loggedUserInfos
                  : chosenUser
              }
              picWidth={90}
              picHeight={90}
              isOutlined={false}
              outlineWidth={null}
              relationType={null}
              sx={{ border: '3.5px solid #fff' }}
            />
          )}

          <Stack direction="row" alignItems="center" columnGap="5px">
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
              {loggedUserInfos.id === parseInt(id, 10)
                ? `${loggedUserInfos.first_name} ${loggedUserInfos.last_name}`
                : isChosenUserLoaded
                ? `${chosenUser.first_name} ${chosenUser.last_name}`
                : null}
            </Typography>
            {loggedUserInfos.id !== parseInt(id, 10) && isChosenUserLoaded ? (
              <>
                {chosenUser.relation_type === 'close_friend' ? (
                  <VerifiedIcon
                    sx={{
                      color: '#F16C22',
                      fontSize: '23.5px',
                    }}
                    onClick={e => handleClick(e)}
                  />
                ) : chosenUser.relation_type === 'friend' ? (
                  <VerifiedIcon
                    sx={{
                      color: '#F29E50',
                      fontSize: '23.5px',
                    }}
                    onClick={e => handleClick(e)}
                  />
                ) : chosenUser.relation_type === 'followed' ? (
                  <BookmarkIcon
                    sx={{ color: '#24A5A5', fontSize: '22px' }}
                    onClick={e => handleClick(e)}
                  />
                ) : (
                  <PersonAddAlt1TwoToneIcon
                    sx={{
                      fontSize: '23.5px',
                      color: '#dcdcdc',
                      position: 'relative',
                      bottom: '1.1px',
                      cursor: 'pointer',
                    }}
                    onClick={e => handleClick(e)}
                  />
                )}
                <FriendRequestBtn
                  page={'profil'}
                  anchorProfilBtn={anchorProfilBtn}
                  setAnchorProfilBtn={setAnchorProfilBtn}
                  receiverId={id}
                />
              </>
            ) : null}
          </Stack>
        </Stack>
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
          ></Box>
          <Stack
            direction="column"
            height="189px"
            columnGap="6px"
            flexWrap="wrap"
          >
            <Box height="189px" width="100px">
              <ProfilDetails
                criticsAndAdvices={criticsAndAdvices}
                loggedUserInfos={loggedUserInfos}
                chosenUser={chosenUser}
              />
            </Box>
            <Item
              customheight="calc(100% - 6px)"
              customwidth="calc(100% - 108px)"
              margintop="6px"
              overflow="hidden"
            >
              <SuggestedGoldNuggets
                page={'profil'}
                goldenMovies={goldenMovies}
                setGoldenMovies={setGoldenMovies}
                chosenUser={chosenUser}
                loggedUserInfos={loggedUserInfos}
              />
            </Item>
          </Stack>
          <SearchBar
            Item={Item}
            page={'profil'}
            loggedUserInfos={loggedUserInfos}
            chosenUser={chosenUser}
            handlePoster={null}
          />
          {chosenMovie !== null ? (
            <CriticAdvicesComponent
              page={'profil'}
              type={
                loggedUserInfos.id === parseInt(id, 10)
                  ? 'new-critic'
                  : 'new-advice'
              }
              chosenMovie={chosenMovie}
              setData={setCriticsAndAdvices}
              setGoldenMovies={setGoldenMovies}
              loggedUserInfos={loggedUserInfos}
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
                  setData={setCriticsAndAdvices}
                  setGoldenMovies={setGoldenMovies}
                  chosenMovie={null}
                  loggedUserInfos={loggedUserInfos}
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
