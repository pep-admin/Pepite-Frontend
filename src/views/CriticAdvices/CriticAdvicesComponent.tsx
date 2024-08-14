// Import des libs externes
import {
  Stack,
  Typography,
  Card,
  Button,
  SwipeableDrawer,
} from '@mui/material';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants customisés
import { Item } from '@utils/components/styledComponent';

// Import des composants internes
import CriticAdvicesContent from './CriticAdvicesContent';
import CriticAdvicesFooter from './CriticAdvicesFooter';
import CommentsComponent from '@views/Comments/CommentsComponent';
import CriticAdvicesModal from './CriticAdvicesModal';
import CriticAdvicesPoster from './CriticAdvicesPoster';
import CriticAdvicesReview from './CriticAdvicesReview';
import CriticAdvicesHeader from './CriticAdvicesHeader';

// Import des requêtes
import { addNewCritic } from '@utils/request/critics/postCritic';
import { modifyCritic } from '@utils/request/critics/modifyCritic';
import { addNewAdvice } from '@utils/request/advices/postAdvice';
import { modifyAdvice } from '@utils/request/advices/modifyAdvice';
import { checkIfAdviceExistsRequest } from '@utils/request/advices/checkIfAdviceExistsRequest';
import { checkIfCriticExistsRequest } from '@utils/request/critics/checkIfCriticExistsRequest';

// Import du hook customisé pour calculer le nombre de cards à afficher en fonction de la largeur du viewport
import { useCardsToShowHorizontal } from '@hooks/useCardsToShowHorizontal';
import { addNewQuickRating } from '@utils/request/quickRatings/addNewQuickRating';
import { performUpdatePostProcessing } from '@utils/functions/criticsAdvicesActions';
import CustomAlert from '@utils/components/CustomAlert';
import CustomAlert2 from '@utils/components/CustomAlert2';

const CriticAdvicesComponent = ({
  page,
  type,
  movieOrTv,
  data,
  setData,
  setGoldenMovies,
  chosenMovie,
  infos,
  loggedUserInfos,
  chosenUser,
  setChosenUser,
  haveMoreCritics,
  isLast,
  inputChoice,
  openSnackbar,
}) => {
  // console.log('rendu');

  const { id } = useParams(); // Id de l'utilisateur du profil visité

  const isProfilUserLogged = loggedUserInfos.id === parseInt(id, 10); // Vérifie si l'utilisateur connecté est sur son profil

  const [newRating, setNewRating] = useState(null); // Note attribuée par l'utilisateur
  const [newCriticText, setNewCriticText] = useState(''); // Nouveau texte de critique
  const [isGoldNugget, setIsGoldNugget] = useState(false); // Pépite ou non
  const [isTurnip, setIsTurnip] = useState(false); // Navet ou non
  const [isModify, setIsModify] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [comments, setComments] = useState([]);
  const [displayRatings, setDisplayRatings] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState({
    state: null,
    contentType: null,
    message: null,
    content: null,
    confirmation: null
  }); // Message de succès, d'info, d'erreur

  const ratingsHeaderRef = useRef(null);

  const { displayType, setChosenMovieId, setChosenMovie } = useData();

  /* Calcule les cards à afficher selon la largeur du viewport.
    width: 95px, gap: 6px, 3 cards en plus pour la marge
  */
  const cardsToShow = useCardsToShowHorizontal(95, 6, 3);

  const handleCriticTextChange = useCallback(text => {
    setNewCriticText(text);
  }, []);

  // ****** Ajouter une nouvelle critique / conseil ****** //
  const submitNewReview = async (type) => {
    try {
      const action = 'submit';

      let alertMessage = '';
      let entityExists = { exists: false, id: null };
      let movie_id: number;
      let movie_name: string;

      if ('movie_id' in chosenMovie) {
        movie_id = chosenMovie.movie_id || chosenMovie.id;
        movie_name = chosenMovie.title;
      } else {
        movie_id = chosenMovie.serie_id || chosenMovie.id;
        movie_name = chosenMovie.name;
      }

      // ======> TODO: Vérifier l'existence des critiques et conseils

      // Vérifie si une critique existe déjà pour ce film
      if (type === 'critic') {
        entityExists = await checkIfCriticExistsRequest(movie_id, movieOrTv);
        alertMessage = `Vous avez déjà publié une critique pour ${
          movieOrTv === 'movie' ? `le film "${chosenMovie.title}".` : `la série "${chosenMovie.name}".`
        } Confirmer malgré tout ?`;
      }
      // Vérifie si le film / série a déjà été conseillé
      else if (type === 'advice') {
        entityExists = await checkIfAdviceExistsRequest(movie_id, movieOrTv);
        alertMessage = `Vous avez déjà conseillé ${
          movieOrTv === 'movie' ? 'le film' : 'la série'
        } "${chosenMovie.title}" à ${chosenUser.first_name} ${
          chosenUser.last_name
        }. Confirmer malgré tout ?`;
      }

      // Si une critique ou un conseil existe déjà, affiche une alerte
      if (entityExists.exists) {
        console.log('la critique existe déjà =>', entityExists);
        
        setAlertSeverity({
          state: 'warning',
          contentType: type,
          message: alertMessage,
          content: entityExists.id,
          confirmation: updateReview
        });
        return;
      }

      if (type === 'critic') {
        await addNewCritic(
          movie_id,
          movieOrTv,
          newRating,
          newCriticText,
          isGoldNugget,
          isTurnip,
        );
      } else if (type === 'advice') {
        console.log('movieOrTv =>', movieOrTv);

        await addNewAdvice(
          chosenUser.id,
          movie_id,
          movie_name,
          movieOrTv,
          newRating,
          newCriticText,
          isGoldNugget,
        );
      } else if (type === 'quick-rating') {
        await addNewQuickRating(
          movie_id,
          movieOrTv,
          newRating,
          isGoldNugget,
          isTurnip,
        );
      }

      // Appelle la fonction de post-traitement pour gérer les opérations communes après l'ajout
      await performUpdatePostProcessing(
        page,
        1,
        type,
        id,
        isProfilUserLogged,
        displayType,
        action,
        openSnackbar,
        setData,
        cardsToShow,
        setGoldenMovies,
        setIsModify,
        setChosenMovie,
        setChosenMovieId,
      );

      if (type === 'quick-rating') {
        setChosenMovieId(null);
        setChosenMovie(null);
      }
    } catch (error) {
      setAlertSeverity({
        state: 'error',
        contentType: null,
        message: error.response.data,
        content: null,
        confirmation: null
      });
    }
  };

  // Modifier une critique / un conseil
  const updateReview = async (overwrite, type, id) => {
    try {
      const entityId = overwrite ? id : infos[`${type}_id`];
      const action = 'update';
      console.log('id à modifier', entityId);
      

      if (type === 'critic') {
        await modifyCritic(
          entityId,
          movieOrTv,
          newRating,
          newCriticText,
          isGoldNugget,
          isTurnip,
        );
      } else if (type === 'advice') {
        await modifyAdvice(
          entityId,
          movieOrTv,
          newRating,
          newCriticText,
          isGoldNugget,
          isTurnip,
        );
      }

      // Appelle la fonction de post-traitement pour gérer les opérations communes après l'ajout
      await performUpdatePostProcessing(
        page,
        1,
        type,
        id,
        isProfilUserLogged,
        movieOrTv,
        action,
        openSnackbar,
        setData,
        cardsToShow,
        setGoldenMovies,
        setIsModify,
        setChosenMovie,
        setChosenMovieId,
      );
    } catch (error) {
      setAlertSeverity({ 
        state: 'error', 
        contentType: null,
        message: error, 
        content: null,
        confirmation: null
      });
    }
  };

  // Fonction pour gérer l'ouverture du SwipeableDrawer des commentaires
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  useEffect(() => {
    if (isModify) {
      setNewRating(parseFloat(infos.rating));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModify]);

  return (
    <>
      <Item
        marginbottom={
          type === 'old-critic' || type === 'old-advice' ? '15px' : '0'
        }
      >
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
              isModify={isModify}
              setIsModify={setIsModify}
              isGoldNugget={isGoldNugget}
              setIsGoldNugget={setIsGoldNugget}
              isTurnip={isTurnip}
              setIsTurnip={setIsTurnip}
              chosenUser={chosenUser}
              setChosenUser={setChosenUser}
              cardsToShow={cardsToShow}
              setGoldenMovies={setGoldenMovies}
              openSnackbar={openSnackbar}
            />
          </Stack>
          <Stack padding="12px 8px">
            <Card
              sx={{
                height: '100%',
                width: 'auto',
                boxShadow: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'visible',
                bgcolor: '#fafafa',
              }}
            >
              <Stack
                direction="row"
                width="100%"
                marginBottom={infos?.text || isModify ? '12px' : '0'}
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
                  infos={infos}
                />
              </Stack>
              {(type === 'old-critic' || type === 'old-advice') &&
              infos?.text === '' &&
              !isModify ? null : (
                <CriticAdvicesReview
                  type={type}
                  onCriticTextChange={handleCriticTextChange}
                  infos={infos}
                  isModify={isModify}
                  newRating={newRating}
                  inputChoice={inputChoice}
                />
              )}
              {type === 'new-critic' ||
              type === 'new-advice' ||
              type === 'new-quick-rating' ||
              isModify ? (
                <Stack direction="row" flexBasis="100%" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      width: '100px',
                      height: '30px',
                      padding: '0',
                      marginTop: '12px',
                      backgroundColor:
                        newRating === null && !isModify ? '#a09f9f' : '#F29E50',
                      color: '#fff',
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
                          type === 'new-critic'
                            ? 'critic'
                            : type === 'new-advice'
                            ? 'advice'
                            : 'quick-rating'
                        );
                      } else if (newRating !== null && infos && isModify) {
                        updateReview(
                          null,
                          type === 'old-critic' ? 'critic' : 'advice',
                          null
                        );
                      }
                    }}
                  >
                    <Typography fontWeight="500" paddingTop="3.5px">
                      {isModify
                        ? 'Modifier'
                        : type === 'new-advice'
                        ? 'Conseiller'
                        : type === 'new-quick-rating'
                        ? 'Noter'
                        : 'Publier'}
                    </Typography>
                  </Button>
                </Stack>
              ) : null}
            </Card>
          </Stack>
          {(type === 'old-critic' || type === 'old-advice') && (
            <CriticAdvicesFooter
              data={data}
              infos={infos}
              toggleDrawer={toggleDrawer}
              comments={comments}
            />
          )}
        </Stack>
      </Item>
      {showPoster ? (
        <CriticAdvicesModal
          page={page}
          showPoster={showPoster}
          setShowPoster={setShowPoster}
          infos={infos}
          loggedUserInfos={loggedUserInfos}
          chosenUser={chosenUser}
          from={type}
        />
      ) : null}
      {(type === 'old-critic' || type === 'old-advice') && (
        <SwipeableDrawer
          anchor="bottom" // Pour que le tiroir s'ouvre du bas
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '15px 15px 0 0',
              maxHeight: '75vh',
              overflow: 'visible',
            },
          }}
        >
          <CommentsComponent
            page={page}
            criticId={infos.critic_id}
            adviceId={infos.advice_id}
            comments={comments}
            setComments={setComments}
            infos={infos}
          />
        </SwipeableDrawer>
      )}
      {isLast && !haveMoreCritics && (
        <Item marginbottom="15px">
          <Stack>
            <Typography fontSize="1em">{"Et c'est tout !"}</Typography>
          </Stack>
        </Item>
      )}
      {alertSeverity.state &&
        <CustomAlert2
          alertType={alertSeverity.state}
          contentType={alertSeverity.contentType}
          message={alertSeverity.message}
          content={alertSeverity.content}
          confirmation={alertSeverity.confirmation}
          setAlertSeverity={setAlertSeverity}
        />
      }
    </>
  );
};

CriticAdvicesComponent.propTypes = {
  page: PropTypes.string.isRequired,
  criticIndex: PropTypes.number,
  type: PropTypes.string.isRequired,
  chosenMovie: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  data: PropTypes.array.isRequired,
  setData: PropTypes.func,
  setGoldenMovies: PropTypes.func.isRequired,
  infos: PropTypes.object,
  loggedUserInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  setChosenUser: PropTypes.func,
  haveMoreCritics: PropTypes.bool,
  isLast: PropTypes.bool,
  inputChoice: PropTypes.string,
  openSnackbar: PropTypes.func.isRequired,
  movieOrTv: PropTypes.string,
};

export default React.memo(CriticAdvicesComponent);
