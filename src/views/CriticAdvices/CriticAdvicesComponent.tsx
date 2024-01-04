// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  Button,
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants customisés
import { Item } from '@utils/styledComponent';

// Import des composants internes
import CriticAdvicesHeader from './CriticAdvicesHeader';
import CriticAdvicesContent from './CriticAdvicesContent';
import CriticAdvicesReview from './CriticAdvicesReview';
import CriticAdvicesFooter from './CriticAdvicesFooter';
import { addNewCritic } from '@utils/request/critics/postCritic';
import { getAllCriticsOfUser } from '@utils/request/critics/getCritics';
import { modifyCritic } from '@utils/request/critics/modifyCritic';
import CommentsComponent from '@views/Comments/CommentsComponent';
import CriticAdvicesModal from './CriticAdvicesModal';
import GoldNugget from '@utils/GoldNugget';
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { addNewAdvice } from '@utils/request/advices/postAdvice';
import { useParams } from 'react-router-dom';
import { getAllAdvicesReceived } from '@utils/request/advices/getAllAdvicesReceived';
import { getUser } from '@utils/request/users/getUser';
import { convertDate } from '@utils/functions/convertDate';

const CriticAdvicesComponent = ({
  type,
  chosenMovie,
  setUserCritics,
  setGoldenMovies,
  setNewCriticError,
  setNewCriticInfo,
  setNewCriticSuccess,
  infos,
  chosenUser,
  countCriticsAndGold,
}) => {
  const [displayOverwiew, setDisplayOverview] = useState(false); // Affichage du synopsis
  const [newRating, setNewRating] = useState(null); // Note attribuée par l'utilisateur
  const [newCriticText, setNewCriticText] = useState(''); // Nouveau texte de critique
  const [isGoldNugget, setIsGoldNugget] = useState(false); // Pépite ou non
  const [isNuggetAnimEnded, setIsNuggetAnimEnded] = useState(false);
  const [isTurnip, setIsTurnip] = useState(false); // Navet ou non
  const [isModify, setIsModify] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [comments, setComments] = useState([]);
  const [displayRatings, setDisplayRatings] = useState(null);
  const [criticUserInfos, setCriticUserInfos] = useState({});

  const ratingsHeaderRef = useRef(null);

  const { id } = useParams(); // Id de l'utilisateur du profil visité

  const { displayType, setChosenMovieId, setChosenMovie } = useData();

  const submitNewReview = async type => {
    try {
      // Si le post est une critique
      if (type === 'critic') {
        // Ajoute la nouvelle critique dans la DB
        await addNewCritic(
          chosenMovie.id,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
        );

        setNewCriticError({ error: false, message: null });
        setNewCriticInfo({ info: false, message: null });
        setNewCriticSuccess({
          success: true,
          message: 'Critique ajoutée avec succès !',
        });
        // const userId = localStorage.getItem('user_id');

        // Récupère toutes les critiques
        const newCriticsData = await getAllCriticsOfUser(id, displayType);
        setUserCritics(newCriticsData);

        // Récupère toutes les pépites
        const response = await getAllGoldNuggetsOfUser(displayType, id);
        setGoldenMovies(response);

        // Compte le nombre de critiques et de pépites
        countCriticsAndGold();
      }
      // Si le post est un conseil
      else if (type === 'advice') {
        // Ajoute le nouveau conseil dans la DB
        await addNewAdvice(
          chosenUser.id,
          chosenMovie.id,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
        );

        setNewCriticError({ error: false, message: null });
        setNewCriticInfo({ info: false, message: null });
        setNewCriticSuccess({
          success: true,
          message: 'Conseil ajouté avec succès !',
        });
        // const userId = localStorage.getItem('user_id');

        // Récupère toutes les conseils du profil de l'utilisateur
        const newCriticsData = await getAllAdvicesReceived(id, displayType);
        console.log("les conseils de l'utilisateur", newCriticsData);

        // setUserCritics(newCriticsData);

        // // Récupère toutes les pépites
        // const response = await getAllGoldNuggetsOfUser(displayType, userId);
        // setGoldenMovies(response);

        // Compte le nombre de critiques et de pépites
        // countCriticsAndGold();
      }
    } catch (error) {
      if (error.response.status === 409) {
        setNewCriticInfo({ info: true, message: error.response.data });
        setNewCriticError({ error: false, message: null });
        setNewCriticSuccess({ success: false, message: null });
      } else {
        setNewCriticError({ error: true, message: error.response.data });
        setNewCriticInfo({ info: false, message: null });
        setNewCriticSuccess({ success: false, message: null });
      }
    }
    setChosenMovieId(null);
    setChosenMovie(null);
  };

  const updateCritic = async () => {
    try {
      const criticId = infos.critic_id;
      const userId = localStorage.getItem('user_id');
      await modifyCritic(
        criticId,
        displayType,
        newRating,
        newCriticText,
        isGoldNugget,
      );

      setNewCriticError({ error: false, message: null });
      setNewCriticInfo({ info: false, message: null });
      setNewCriticSuccess({
        success: true,
        message: 'Critique modifiée avec succès !',
      });

      const newCriticsData = await getAllCriticsOfUser(userId, displayType);
      setUserCritics(newCriticsData);
      setIsModify(false);

      const response = await getAllGoldNuggetsOfUser(displayType, userId);
      setGoldenMovies(response);

      // Compte le nombre de critiques et de pépites
      countCriticsAndGold();
    } catch (error) {
      console.log('erreur dans la modification', error);
      setNewCriticError({ error: true, message: error });
      setNewCriticInfo({ info: false, message: null });
      setNewCriticSuccess({ success: false, message: null });
    }
  };

  const getCriticUserInfos = async () => {
    const userInfos = await getUser(infos.sender_id);
    setCriticUserInfos(userInfos);
  };

  useEffect(() => {
    if (isModify) {
      setNewRating(parseFloat(infos.rating));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModify]);

  useEffect(() => {
    if (type === 'old-critic' || type === 'old-advice') {
      getCriticUserInfos();
    }
  }, []);

  return (
    <>
      {showPoster ? (
        <CriticAdvicesModal
          showPoster={showPoster}
          setShowPoster={setShowPoster}
          infos={infos}
          from={'critic'}
        />
      ) : null}
      <Item margintop="6px">
        <Stack height="100%">
          <Stack direction="column" position="relative">
            <CriticAdvicesHeader
              type={type}
              ratingsHeaderRef={ratingsHeaderRef}
              displayRatings={displayRatings}
              setDisplayRatings={setDisplayRatings}
              newRating={newRating}
              setNewRating={setNewRating}
              infos={infos}
              setUserCritics={setUserCritics}
              isModify={isModify}
              setIsModify={setIsModify}
              isGoldNugget={isGoldNugget}
              setIsGoldNugget={setIsGoldNugget}
              setIsNuggetAnimEnded={setIsNuggetAnimEnded}
              isTurnip={isTurnip}
              setIsTurnip={setIsTurnip}
              chosenUser={chosenUser}
              criticUserInfos={criticUserInfos}
            />
            <Stack
              direction="row"
              alignItems="center"
              width="100%"
              position="absolute"
              top="25px"
            >
              <Typography
                padding="0 10px"
                sx={{ fontSize: '0.8em', color: '#989898' }}
              >
                {`${convertDate(infos.created_at)}`}
              </Typography>
              <Divider sx={{ flexGrow: '1' }} />
            </Stack>
          </Stack>
          <Stack padding="10px 8px">
            <Card
              sx={{
                height: '100%',
                width: 'auto',
                boxShadow: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'visible',
              }}
            >
              <Box
                marginBottom={displayOverwiew ? '7px' : '0'}
                minHeight="120px"
                display="flex"
                flexGrow="1"
                sx={{ transition: 'margin-bottom 0.5s ease-in-out' }}
              >
                <CardActionArea
                  sx={{
                    height: '100%',
                    width: 'auto',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="120px"
                    image={
                      chosenMovie !== null
                        ? `https://image.tmdb.org/t/p/w500/${chosenMovie.poster_path}`
                        : `https://image.tmdb.org/t/p/w500/${infos.poster_path}`
                    }
                    alt="green iguana"
                    sx={{
                      objectFit: 'contain',
                      borderRadius: '10px',
                    }}
                    onClick={
                      type === 'old-critic' ? () => setShowPoster(true) : null
                    }
                  />
                </CardActionArea>
                <CriticAdvicesContent
                  type={type}
                  chosenMovie={chosenMovie}
                  displayOverview={displayOverwiew}
                  setDisplayOverview={setDisplayOverview}
                  isGoldNugget={isGoldNugget}
                  setIsGoldNugget={setIsGoldNugget}
                  isTurnip={isTurnip}
                  infos={infos}
                  isModify={isModify}
                />
              </Box>
              <Stack
                direction="row"
                flexGrow="1"
                marginBottom={
                  type === 'new-critic' || type === 'new-advice' || isModify
                    ? '15px'
                    : '7px'
                }
                sx={{
                  maxHeight: displayOverwiew ? '60px' : '0px',
                  overflowY: 'scroll',
                  transition: 'max-height 0.5s ease-in-out',
                }}
              >
                <Divider
                  orientation="vertical"
                  sx={{ borderColor: 'primary.dark' }}
                />
                <Typography
                  variant="body2"
                  component="p"
                  align="left"
                  paddingLeft="10px"
                >
                  {chosenMovie &&
                  (type === 'new-critic' || type === 'new-advice')
                    ? chosenMovie.overview
                    : infos.overview}
                </Typography>
              </Stack>
              <CriticAdvicesReview
                type={type}
                newCriticText={newCriticText}
                setNewCriticText={setNewCriticText}
                infos={infos}
                isModify={isModify}
                newRating={newRating}
                chosenUser={chosenUser}
                criticUserInfos={criticUserInfos}
              />
              {type === 'new-critic' || type === 'new-advice' || isModify ? (
                <Stack direction="row" flexBasis="100%" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      maxWidth: '100px',
                      maxHeight: '30px',
                      backgroundColor:
                        newRating === null && !isModify ? '#a09f9f' : '#F29E50',
                      opacity: newRating === null && !isModify ? '0.3' : '1',
                      cursor:
                        newRating === null && !isModify ? 'help' : 'pointer',
                      '&:hover': {
                        backgroundColor: '#a09f9f',
                      },
                    }}
                    onClick={() => {
                      // Si l'utilisateur tente de publier sans avoir mis de note, on affiche le choix des notes
                      if (newRating === null && !isModify) {
                        setDisplayRatings(ratingsHeaderRef.current);
                        // Si l'utilisateur a choisi une note on publie la critique || le conseil
                      } else if (newRating !== null && !isModify) {
                        submitNewReview(
                          type === 'new-critic' ? 'critic' : 'advice',
                        );
                      } else if (newRating !== null && infos && isModify) {
                        updateCritic();
                      }
                    }}
                  >
                    {isModify
                      ? 'Modifier'
                      : type === 'new-advice'
                      ? 'Conseiller'
                      : 'Publier'}
                  </Button>
                </Stack>
              ) : null}
            </Card>
          </Stack>
          {type === 'old-critic' || type === 'old-advice' ? (
            <CriticAdvicesFooter
              criticId={infos.critic_id}
              displayComments={displayComments}
              setDisplayComments={setDisplayComments}
              comments={comments}
            />
          ) : null}
        </Stack>
      </Item>
      {isGoldNugget && !isNuggetAnimEnded ? (
        <GoldNugget setIsNuggetAnimEnded={setIsNuggetAnimEnded} />
      ) : null}
      {displayComments ? (
        <CommentsComponent
          criticId={infos.critic_id}
          comments={comments}
          setComments={setComments}
        />
      ) : null}
    </>
  );
};

CriticAdvicesComponent.propTypes = {
  type: PropTypes.string.isRequired,
  chosenMovie: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  setUserCritics: PropTypes.func,
  setNewCriticError: PropTypes.func,
  setNewCriticInfo: PropTypes.func,
  setNewCriticSuccess: PropTypes.func,
  infos: PropTypes.object,
  setGoldenMovies: PropTypes.func.isRequired,
  chosenUser: PropTypes.object,
  countCriticsAndGold: PropTypes.func.isRequired,
};

export default CriticAdvicesComponent;
