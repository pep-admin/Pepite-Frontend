// Import des libs externes
import { Box, Container, Modal, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import Header from '@utils/components/Header';
import SearchBar2 from '@utils/components/SearchBar2';
import UserAvatar from '@utils/components/UserAvatar';
import ProfilRank2 from '@views/Profil/ProfilRank2';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import GradientBtn from '@views/CriticAdvices/GradientBtn';
import SuggestedGoldNuggets2 from '@utils/components/SuggestedGoldNuggets2';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import du hook de scroll vertical infini
import useVerticalScroll from '@hooks/useVerticalScroll';

// Import des requêtes
import { getAdvicesReceived } from '@utils/request/advices/getAdvicesReceived';
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import { getCriticsOfUser } from '@utils/request/critics/getCritics';
import { getUser } from '@utils/request/users/getUser';
import { countCriticsAndGoldUser } from '@utils/functions/countCriticsAndGoldUser';

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

const ProfilComponent2 = () => {

  const { displayType, chosenMovie, setChosenMovie } = useData();
  const { id } = useParams();

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const isProfilUserLogged = loggedUserInfos.id === parseInt(id, 10); // Vérifie si le profil affiché est celui de l'utilisateur connecté

  const [isDataFetched, setIsDataFetched] = useState(false); // Si les critiques et conseils ont été récupérés
  const [criticsAndAdvices, setCriticsAndAdvices] = useState([]); // Les critiques et les conseils de l'utilisateur du profil
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites de l'utilisateur du profil
  const [chosenUser, setChosenUser] = useState<User | null>(null); // Les informations de l'utilisateur autre que celui connecté
  const [isChosenUserLoaded, setIsChosenUserLoaded] = useState(false); // Etat de chargement des informations de l'utilisateur extérieur
  const [criticsNumber, setCriticsNumber] = useState(0);
  const [goldNuggetsNumber, setGoldNuggetsNumber] = useState(0);

  const firstRender = useRef(true);

  // Récupération de la photo de couverture
  const getCoverPic = () => {
    // Si profil de l'utilisateur connecté et qu'une photo de couverture a été choisie
    if(isProfilUserLogged && loggedUserInfos.coverPics.length) {      
      return `${apiBaseUrl}/uploads/${
        loggedUserInfos.coverPics.find(pic => pic.isActive === 1)
          .filePath
      }`;
    }
    // Si profil d'un autre utilisateur et qu'une photo de couverture a été choisie
    else if(!isProfilUserLogged && chosenUser?.coverPics.length) {
      return `${apiBaseUrl}/uploads/${
        chosenUser.coverPics.find(pic => pic.isActive === 1).filePath
      }`;
    }
    // Si aucune photo de couverture n'a été choisie
    else {
      return `${assetsBaseUrl}/images/default_cover_pic_pietro_jeng.jpg`;
    }
  }

  // Récupère les critiques et conseils de l'utilisateur du profil
  const getCriticsAndAdvices = useCallback(
    async page => {
      try {
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
    getCriticsAndAdvices,
    displayType,
    setCriticsAndAdvices,
    setIsDataFetched,
  );

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
    if(!isProfilUserLogged) {
      fetchChosenUser(id);
    }
  }, []);

  return (
    <>
      <Header page={'profil'} />
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
            data={criticsAndAdvices}
            setData={setCriticsAndAdvices}
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
          <Stack position='relative'>
            <Box
              height='40vh'
              width='100vw'
              justifyContent='flex-end'
              sx={{
                backgroundImage: `url(${getCoverPic()})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                maskImage: "url('/images/rounded_mask.svg')",
                maskSize: 'cover',
                maskRepeat: 'no-repeat',
                maskPosition: 'center center',
              }}
            >
            </Box>
            <Stack 
              alignItems='center' 
              width='100vw'
              position='absolute'
              bottom='-45px'
              zIndex='2'
            >
              <GradientBtn 
                btnType={'movies-list'} 
                criticsNumber={null}
                goldNuggetsNumber={null}
              />
              <Stack direction='row' alignItems='center' columnGap='9vw'>
                <GradientBtn 
                  btnType={'ratings'} 
                  criticsNumber={criticsNumber}
                  goldNuggetsNumber={goldNuggetsNumber}
                />
                {(isProfilUserLogged || isChosenUserLoaded) && (
                  <UserAvatar
                    variant={'circular'}
                    userInfos={
                      isProfilUserLogged
                        ? loggedUserInfos
                        : chosenUser
                    }
                    picWidth={100}
                    picHeight={100}
                    isOutlined={true}
                    outlineWidth={'4px'}
                    relationType={isProfilUserLogged ? 'self' : chosenUser?.relation_type}
                    sx={{
                      boxShadow: '0px 8px 5px 0px rgb(57 57 57 / 14%)'
                    }}
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
          <Stack alignItems='center' marginTop='52px'>
            <Typography 
              component='h2' 
              fontWeight='600'
              color='#383838'
              fontSize='4vh'
              letterSpacing='-1px'
              lineHeight='1'
              margin='7px 0 4px 0'
            >
              {isProfilUserLogged
                ? `${loggedUserInfos.first_name} ${loggedUserInfos.last_name}`
                : isChosenUserLoaded
                ? `${chosenUser.first_name} ${chosenUser.last_name}`
                : null}
            </Typography>
            <ProfilRank2 criticsNumber={criticsNumber} />
          </Stack>
          <Stack padding='0 4%' margin='20px 0 0 0'>
            <Typography 
              component='h4' 
              variant='body2' 
              fontWeight='600'
              color='#383838'  
            >
              {
                isProfilUserLogged ?
                  'Vos dernières pépites'
                : isChosenUserLoaded ?
                `${chosenUser.first_name} ${chosenUser.last_name}`
                : null
              }
            </Typography>
          </Stack>
          <Box 
            width='100vw' 
            marginTop='64px'
            bgcolor='#CAE6E4'
            position='relative'
          >
            <SuggestedGoldNuggets2 
              page={'profil'} 
              loggedUserInfos={loggedUserInfos} 
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
            />
            <Stack padding='0 4%' marginTop='80px'>
              <Stack>
                <Typography 
                  component='h4' 
                  variant='body2' 
                  fontWeight='600'
                  color='#383838'  
                >
                  {'Publiez une critique'}
                </Typography>
              </Stack>
              <SearchBar2 page={'profil'} loggedUserInfos={loggedUserInfos}  />
            </Stack>
            <Stack padding='0 4%' marginTop='20px'>
              <Stack marginBottom='6px'>
                <Typography 
                  component='h4' 
                  variant='body2' 
                  fontWeight='600'
                  color='#383838'  
                >
                  {'Votre fil d\'actualité'}
                </Typography>
              </Stack>
              {criticsAndAdvices.length ? (
                criticsAndAdvices.map(infos => {
                  return (
                    <CriticAdvicesComponent
                      key={`${infos.type}-${infos.id}`}
                      page={'profil'}
                      type={infos.critic_id ? 'old-critic' : 'old-advice'}
                      data={criticsAndAdvices}
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
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default ProfilComponent2;