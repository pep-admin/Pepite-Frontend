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
  CircularProgress,
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants customisés
import { Item, TurnipIcon } from '@utils/styledComponent';

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
// import GoldNugget from '@utils/GoldNugget';
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { addNewAdvice } from '@utils/request/advices/postAdvice';
import { useParams } from 'react-router-dom';
import { getAllAdvicesReceived } from '@utils/request/advices/getAllAdvicesReceived';
import { getUser } from '@utils/request/users/getUser';
import { convertDate } from '@utils/functions/convertDate';
import { checkIfCriticExistsRequest } from '@utils/request/critics/checkIfCriticExistsRequest';
import CustomAlert from '@utils/CustomAlert';

const CriticAdvicesComponent = ({
  type,
  chosenMovie,
  setUserCritics,
  setGoldenMovies,
  infos,
  chosenUser,
  countCriticsAndGold,
  haveMoreCritics,
  isLast,
}) => {
  const [displayOverwiew, setDisplayOverview] = useState(false); // Affichage du synopsis
  const [newRating, setNewRating] = useState(null); // Note attribuée par l'utilisateur
  const [newCriticText, setNewCriticText] = useState(''); // Nouveau texte de critique
  const [isGoldNugget, setIsGoldNugget] = useState(false); // Pépite ou non
  // const [isNuggetAnimEnded, setIsNuggetAnimEnded] = useState(false);
  const [isTurnip, setIsTurnip] = useState(false); // Navet ou non
  const [isModify, setIsModify] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [comments, setComments] = useState([]);
  const [displayRatings, setDisplayRatings] = useState(null);
  const [criticUserInfos, setCriticUserInfos] = useState({});
  const [alertSeverity, setAlertSeverity] = useState({
    state: null,
    message: null,
    content: null,
  }); // Message de succès, d'info, d'erreur

  const ratingsHeaderRef = useRef(null);

  const { id } = useParams(); // Id de l'utilisateur du profil visité

  const { displayType, setChosenMovieId, setChosenMovie } = useData();

  // Ajouter une nouvelle critique / conseil
  const submitNewReview = async type => {
    try {
      // Si le post est une critique
      if (type === 'critic') {
        // Vérifie si la critique pour ce même film / série est déjà existante
        const isCriticExists = await checkIfCriticExistsRequest(
          chosenMovie.id,
          displayType,
        );

        if (isCriticExists.exists) {
          setAlertSeverity({
            state: 'warning',
            message: `
            Vous avez déjà publié une critique pour ${
              displayType === 'movie' ? 'le film' : 'la série'
            } 
            "${chosenMovie.title}". Confirmer malgré tout ?`,
            content: isCriticExists.criticId,
          });
          return;
        }

        // Ajoute la nouvelle critique dans la DB
        await addNewCritic(
          chosenMovie.id,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
          isTurnip,
        );

        // Message de succès
        setAlertSeverity({
          state: 'success',
          message: 'Critique ajoutée avec succès !',
          content: null,
        });

        // Récupère toutes les critiques
        const newCriticsData = await getAllCriticsOfUser(id, displayType);
        setUserCritics(newCriticsData);

        // Récupère toutes les pépites
        const response = await getAllGoldNuggetsOfUser(displayType, id);
        setGoldenMovies(response);

        // Compte le nombre de critiques et de pépites
        countCriticsAndGold();

        // Ferme la fenêtre permettant de noter un nouveau film / série
        setChosenMovieId(null);
        setChosenMovie(null);
      }
      // Si le post est un conseil
      else if (type === 'advice') {
        console.log("ajout d'un nouveau conseil");

        // Ajoute le nouveau conseil dans la DB
        await addNewAdvice(
          chosenUser.id,
          chosenMovie.id,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
        );

        // Message de succès
        setAlertSeverity({
          state: 'success',
          message: 'Conseil ajouté avec succès !',
          content: null,
        });

        const userId = localStorage.getItem('user_id');

        // Récupère toutes les conseils du profil de l'utilisateur
        const newCriticsData = await getAllAdvicesReceived(id, displayType);

        setUserCritics(newCriticsData);

        // Récupère toutes les pépites
        const response = await getAllGoldNuggetsOfUser(displayType, userId);
        setGoldenMovies(response);

        // Compte le nombre de critiques et de pépites
        countCriticsAndGold();

        // Ferme la fenêtre permettant de conseiller un nouveau film / série
        setChosenMovieId(null);
        setChosenMovie(null);
      }
    } catch (error) {
      setAlertSeverity({
        state: 'error',
        message: error.response.data,
        content: null,
      });
    }
  };

  // Modifier une critique
  const updateCritic = async from => {
    try {
      const userId = localStorage.getItem('user_id');
      let criticId;

      // Si l'utilisateur tente de re noter à nouveau de zéro
      if (from === 'overwrite') {
        criticId = alertSeverity.content;
      } else {
        criticId = infos.critic_id;
      }

      await modifyCritic(
        criticId,
        displayType,
        newRating,
        newCriticText,
        isGoldNugget,
        isTurnip,
      );

      setAlertSeverity({
        state: 'success',
        message: 'Critique modifiée avec succès !',
        content: null,
      });

      // Nouvelle récupération des critiques
      const newCriticsData = await getAllCriticsOfUser(userId, displayType);
      setUserCritics(newCriticsData);
      setIsModify(false);

      // Nouvelle récupération des pépites
      const response = await getAllGoldNuggetsOfUser(displayType, userId);
      setGoldenMovies(response);

      // Compte le nombre de critiques et de pépites
      countCriticsAndGold();

      // Si l'utilisateur a choisi d'écraser une critique existante, on ferme la fenêtre qui permet de noter
      if (from === 'overwrite') {
        setChosenMovieId(null);
        setChosenMovie(null);
      }
    } catch (error) {
      setAlertSeverity({ state: 'error', message: error, content: null });
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
      {alertSeverity.state ? (
        <CustomAlert
          type={alertSeverity.state}
          message={alertSeverity.message}
          setOnAlert={setAlertSeverity}
          confirmation={updateCritic}
          usage={'overwrite'}
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
              // setIsNuggetAnimEnded={setIsNuggetAnimEnded}
              isTurnip={isTurnip}
              setIsTurnip={setIsTurnip}
              chosenUser={chosenUser}
              criticUserInfos={criticUserInfos}
            />
            {type === 'new-critic' || type === 'new-advice' ? (
              <Divider />
            ) : (
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
            )}
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
                    position: 'relative',
                    height: '100%',
                    width: 'auto',
                    display: 'flex',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
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
                  {((type === 'old-critic' || type === 'old-advice') &&
                    !isModify &&
                    (infos?.is_gold_nugget || infos?.is_turnip)) ||
                  ((type === 'new-critic' ||
                    type === 'new-advice' ||
                    isModify) &&
                    (isGoldNugget || isTurnip)) ? (
                    <Box
                      width="23px"
                      height="23px"
                      position="absolute"
                      top="3px"
                      right="3px"
                      borderRadius="50%"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: 'rgba(244, 244, 244, 0.65)' }}
                    >
                      {(infos?.is_gold_nugget && !isModify) ||
                      (isGoldNugget && !isTurnip) ? (
                        <img
                          src="/images/gold_right_top_outlined.svg"
                          alt=""
                          style={{
                            position: 'relative',
                            top: '0.2px',
                          }}
                        />
                      ) : (infos?.is_turnip && !isModify) ||
                        (!isGoldNugget && isTurnip) ? (
                        <TurnipIcon
                          sx={{
                            fontSize: '1.2em',
                            position: 'relative',
                            top: '0.2px',
                            right: '0.1px',
                          }}
                        />
                      ) : null}
                    </Box>
                  ) : null}
                </CardActionArea>
                <CriticAdvicesContent
                  type={type}
                  chosenMovie={chosenMovie}
                  displayOverview={displayOverwiew}
                  setDisplayOverview={setDisplayOverview}
                  // isGoldNugget={isGoldNugget}
                  // setIsGoldNugget={setIsGoldNugget}
                  // isTurnip={isTurnip}
                  infos={infos}
                  // isModify={isModify}
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
                // chosenUser={chosenUser}
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
                        updateCritic(null);
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
              infos={infos}
              displayComments={displayComments}
              setDisplayComments={setDisplayComments}
              comments={comments}
            />
          ) : null}
        </Stack>
      </Item>
      {/* TODO : optimiser l'animation */}
      {/* {isGoldNugget && !isNuggetAnimEnded ? (
        <GoldNugget setIsNuggetAnimEnded={setIsNuggetAnimEnded} />
      ) : null} */}
      {displayComments ? (
        <CommentsComponent
          criticId={infos.critic_id}
          comments={comments}
          setComments={setComments}
        />
      ) : null}
      {isLast && haveMoreCritics ? (
        <Stack
          direction="row"
          justifyContent="center"
          margin="10px 0 !important"
        >
          <CircularProgress color="primary" />
        </Stack>
      ) : isLast ? (
        <Item>
          <Stack>
            <Typography>{'Plus rien à afficher pour le moment.'}</Typography>
          </Stack>
        </Item>
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
  countCriticsAndGold: PropTypes.func,
  haveMoreCritics: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default CriticAdvicesComponent;
