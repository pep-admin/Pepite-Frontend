// Import des libs externes
import { Stack, Box, Typography, Divider, Card, Button } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
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
import CommentsComponent from '@views/Comments/CommentsComponent';
import CriticAdvicesModal from './CriticAdvicesModal';
import CustomAlert from '@utils/CustomAlert';
import CriticAdvicesPoster from './CriticAdvicesPoster';
// import GoldNugget from '@utils/GoldNugget';

// Import des requêtes
import { addNewCritic } from '@utils/request/critics/postCritic';
import { getCriticsOfUser } from '@utils/request/critics/getCritics';
import { modifyCritic } from '@utils/request/critics/modifyCritic';
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { addNewAdvice } from '@utils/request/advices/postAdvice';
import { useParams } from 'react-router-dom';
import { getAdvicesReceived } from '@utils/request/advices/getAdvicesReceived';
import { getUser } from '@utils/request/users/getUser';
import { modifyAdvice } from '@utils/request/advices/modifyAdvice';
import { checkIfAdviceExistsRequest } from '@utils/request/advices/checkIfAdviceExistsRequest';
import { checkIfCriticExistsRequest } from '@utils/request/critics/checkIfCriticExistsRequest';

// Import des fonctions utiles
import { convertDate } from '@utils/functions/convertDate';
import { useCardsToShow } from '@hooks/useCardsToShow';

const CriticAdvicesComponent = ({
  page,
  type,
  chosenMovie,
  setData,
  setGoldenMovies,
  infos,
  chosenUser,
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

  /* Calcule les cards à afficher selon la largeur du viewport.
    width: 95px, gap: 6px, 3 cards en plus pour la marge
  */
  const cardsToShow = useCardsToShow(95, 6, 3);

  // Fonction pour effectuer les mises à jour après la modification
  const performUpdatePostProcessing = async (
    type,
    userId,
    displayType,
    isNewEntity,
  ) => {
    const message = isNewEntity
      ? `${
          type === 'critic' ? 'Critique ajoutée' : 'Conseil ajouté'
        } avec succès !`
      : `${
          type === 'critic' ? 'Critique modifiée' : 'Conseil modifié'
        } avec succès !`;

    setAlertSeverity({
      state: 'success',
      message: message,
      content: null,
    });

    const newData =
      type === 'critic'
        ? await getCriticsOfUser(userId, displayType, 1)
        : await getAdvicesReceived(id, displayType, 1);

    setData(newData);
    // if (type === 'critic') {
    //   setUserCritics(newData);
    // } else {
    //   setAdvicesReceived(newData);
    // }

    const response = await getAllGoldNuggetsOfUser(
      displayType,
      userId,
      cardsToShow,
      1,
    );

    setGoldenMovies(response.data.goldenMovies);

    // countCriticsAndGold();
    setIsModify(false);

    setChosenMovieId(null);
    setChosenMovie(null);
  };

  // ****** Ajouter une nouvelle critique / conseil ****** //
  const submitNewReview = async type => {
    try {
      let alertMessage = '';
      let entityExists = { exists: false, id: null };
      const userId = localStorage.getItem('user_id');

      if (type === 'critic') {
        entityExists = await checkIfCriticExistsRequest(
          chosenMovie.id,
          displayType,
        );
        alertMessage = `Vous avez déjà publié une critique pour ${
          displayType === 'movie' ? 'le film' : 'la série'
        } "${chosenMovie.title}". Confirmer malgré tout ?`;
      } else if (type === 'advice') {
        entityExists = await checkIfAdviceExistsRequest(
          chosenMovie.id,
          displayType,
        );
        alertMessage = `Vous avez déjà conseillé ${
          displayType === 'movie' ? 'le film' : 'la série'
        } "${chosenMovie.title}" à ${chosenUser.first_name} ${
          chosenUser.last_name
        }. Confirmer malgré tout ?`;
      }

      // Si une critique ou un conseil existe déjà, affiche une alerte
      if (entityExists.exists) {
        setAlertSeverity({
          state: 'warning',
          message: alertMessage,
          content: entityExists.id,
        });
        return;
      }

      if (type === 'critic') {
        await addNewCritic(
          chosenMovie.id,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
          isTurnip,
        );
      } else if (type === 'advice') {
        await addNewAdvice(
          chosenUser.id,
          chosenMovie.id,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
        );
      }

      // Appelle la fonction de post-traitement pour gérer les opérations communes après l'ajout
      await performUpdatePostProcessing(type, userId, displayType, true);
    } catch (error) {
      setAlertSeverity({
        state: 'error',
        message: error.response.data,
        content: null,
      });
    }
  };

  // Modifier une critique / un conseil
  const updateReview = async (overwrite, type) => {
    try {
      const userId = localStorage.getItem('user_id');
      const entityId = overwrite ? alertSeverity.content : infos[`${type}_id`];

      if (type === 'critic') {
        await modifyCritic(
          entityId,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
          isTurnip,
        );
      } else if (type === 'advice') {
        await modifyAdvice(
          entityId,
          displayType,
          newRating,
          newCriticText,
          isGoldNugget,
          isTurnip,
        );
      }

      await performUpdatePostProcessing(type, userId, displayType, false);
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
          criticOrAdvice={type}
          alertType={alertSeverity.state}
          message={alertSeverity.message}
          setOnAlert={setAlertSeverity}
          confirmation={updateReview}
          // usage={'overwrite'}
        />
      ) : null}
      <Item margintop="6px">
        <Stack height="100%">
          <Stack direction="column" position="relative">
            <CriticAdvicesHeader
              page={page}
              type={type}
              ratingsHeaderRef={ratingsHeaderRef}
              displayRatings={displayRatings}
              setDisplayRatings={setDisplayRatings}
              newRating={newRating}
              setNewRating={setNewRating}
              infos={infos}
              setData={setData}
              // setUserCritics={setUserCritics}
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
                <CriticAdvicesPoster
                  chosenMovie={chosenMovie}
                  type={type}
                  setShowPoster={setShowPoster}
                  isModify={isModify}
                  infos={infos}
                  isGoldNugget={isGoldNugget}
                  isTurnip={isTurnip}
                />
                <CriticAdvicesContent
                  type={type}
                  chosenMovie={chosenMovie}
                  displayOverview={displayOverwiew}
                  setDisplayOverview={setDisplayOverview}
                  infos={infos}
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
              {(type === 'old-critic' || type === 'old-advice') &&
              infos.text === '' &&
              !isModify ? null : (
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
              )}
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
                        // Si l'utilisateur a choisi au minimum une note on publie la critique || le conseil
                      } else if (newRating !== null && !isModify) {
                        submitNewReview(
                          type === 'new-critic' ? 'critic' : 'advice',
                        );
                      } else if (newRating !== null && infos && isModify) {
                        console.log('update');

                        updateReview(
                          null,
                          type === 'old-critic' ? 'critic' : 'advice',
                        );
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
      {isLast && !haveMoreCritics ? (
        <Item>
          <Stack>
            <Typography fontSize="1em">{"Et c'est tout !"}</Typography>
          </Stack>
        </Item>
      ) : null}
    </>
  );
};

CriticAdvicesComponent.propTypes = {
  page: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  chosenMovie: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  setData: PropTypes.func,
  infos: PropTypes.object,
  setGoldenMovies: PropTypes.func.isRequired,
  chosenUser: PropTypes.object,
  haveMoreCritics: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default React.memo(CriticAdvicesComponent);
