// Import des libs externes
import { Badge, Box, Snackbar, Stack, SwipeableDrawer } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

// Import des composants internes
import Header from '@utils/components/Header';
import SwipeCard3 from '@views/Swipe/SwipeCard3';
import { CustomButton } from '@views/Swipe/CustomBtn';
import SwipeFilter2 from '@views/Swipe/SwipeFilter2';
import ChoiceBtn2 from '@views/Swipe/ChoiceBtn2';
import CustomAlert from '@utils/components/CustomAlert';

// Import de l'icône du filtre
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

// Import de la fonction pour compter les filtres actifs
import { countActiveFiltersSwipe } from '@utils/functions/countActiveFiltersSwipe';

// Import des requêtes
import { handleUnwantedMovieRequest } from '@utils/request/list/handleUnwantedMovieRequest';
import { handleWantedMovieRequest } from '@utils/request/list/handleWantedMovieRequest';
import { handleWatchedMovieRequest } from '@utils/request/list/handleWatchedMovieRequest';

const SwipeComponent3 = ({
  movies,
  setMovies,
  currentIndex,
  setCurrentIndex,
  typeChosen,
  setTypeChosen,
  countryChosen,
  setCountryChosen,
  genreChosen,
  setGenreChosen,
  ratingChosen,
  setRatingChosen,
  periodChosen,
  setPeriodChosen,
  setIsFilterValidated,
  error,
  setError,
}) => {
  console.log('rendu swipe component !');

  // Clés uniques pour chaque carte
  const [currentCardKey, setCurrentCardKey] = useState(uuidv4());
  const [previousCardKey, setPreviousCardKey] = useState(uuidv4());
  const [nextCardKey, setNextCardKey] = useState(uuidv4());

  const [isUnwanted, setIsUnwanted] = useState(
    movies[currentIndex]?.is_unwanted,
  );
  const [isWanted, setIsWanted] = useState(movies[currentIndex]?.is_wanted);
  const [isWatched, setIsWatched] = useState(movies[currentIndex]?.is_watched);

  // Gestion de l'ouverture du panneau des filtres
  const [areFiltersOpened, setAreFiltersOpened] = useState(false);

  // Gestion du message d'information lors du clic sur les boutons d'actions
  const [openSnackbar, setOpenSnackbar] = useState(null);
  const isSnackbarVisibleRef = useRef(false);

  // Gestion de superposition des cartes
  const [zIndexes, setZIndexes] = useState({
    current: 3,
    previous: 1,
    next: 2,
  });

  // Gestion de la bande-annonce
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [isTrailerFullscreen, setIsTrailerFullscreen] = useState(false);

  // Sens du swipe pour détecter la superposition des cartes
  const dragDirectionRef = useRef<string | null>(null);

  const currentMovie = movies[currentIndex];
  const nextMovie =
    currentIndex < movies.length - 1 ? movies[currentIndex + 1] : null;
  const previousMovie = currentIndex > 0 ? movies[currentIndex - 1] : null;

  // Gère la superposition des cartes
  const setZIndexForSwipe = direction => {
    if (direction === 'right') {
      if (dragDirectionRef.current !== 'right') {
        dragDirectionRef.current = 'right';
        setZIndexes({
          current: 3,
          previous: 1,
          next: 2,
        });
      }
    } else if (direction === 'left') {
      if (dragDirectionRef.current !== 'left') {
        dragDirectionRef.current = 'left';
        setZIndexes({
          current: 3,
          previous: 2,
          next: 1,
        });
      }
    }
  };

  // Gère l'index selon le sens du swipe
  const onSwipeComplete = direction => {
    if (direction === 'left' && currentIndex < movies.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }

    // Générer de nouvelles clés pour chaque carte
    setCurrentCardKey(uuidv4());
    setPreviousCardKey(uuidv4());
    setNextCardKey(uuidv4());
  };

  // Gestion des messages d'informations lors de l'action des boutons
  const handleSnackbarMessage = (btnChoice: string) => {
    isSnackbarVisibleRef.current = true;

    switch (btnChoice) {
      case 'unwanted':
        if (!isUnwanted) {
          handleOpenSnackbar(
            `"${movies[currentIndex].title}" ne vous sera plus proposé`,
          );
        } else {
          handleOpenSnackbar(
            `"${movies[currentIndex].title}" pourra vous être proposé`,
          );
        }
        break;
      case 'wanted':
        if (!isWanted) {
          handleOpenSnackbar(
            `"${movies[currentIndex].title}" a été ajouté à votre liste`,
          );
        } else {
          handleOpenSnackbar(
            `"${movies[currentIndex].title}" a été retiré de votre liste`,
          );
        }
        break;
      case 'watched':
        if (!isWatched) {
          handleOpenSnackbar(
            `Vous avez déjà vu "${movies[currentIndex].title}"`,
          );
        } else {
          handleOpenSnackbar(
            `Vous n'avez pas vu "${movies[currentIndex].title}"`,
          );
        }
        break;
      default:
        break;
    }
  };

  const handleChoice = (btnChoice: string) => {
    const updatedMovies = [...movies];
    const currentMovie = updatedMovies[currentIndex];

    if (btnChoice === 'unwanted') {
      currentMovie.is_unwanted = !currentMovie.is_unwanted;
      currentMovie.is_wanted = false; // Réinitialiser "wanted"
      currentMovie.is_watched = false; // Réinitialiser "watched"
    } else if (btnChoice === 'wanted') {
      currentMovie.is_wanted = !currentMovie.is_wanted;
      currentMovie.is_unwanted = false; // Réinitialiser "unwanted"
      currentMovie.is_watched = false; // Réinitialiser "watched"
    } else if (btnChoice === 'watched') {
      currentMovie.is_watched = !currentMovie.is_watched;
      currentMovie.is_unwanted = false; // Réinitialiser "unwanted"
      currentMovie.is_wanted = false; // Réinitialiser "wanted"
    }

    setMovies(updatedMovies); // Mettre à jour l'état avec les modifications
  };

  // Gestion des actions des boutons
  const handleActions = async (btnChoice: string) => {
    if (isSnackbarVisibleRef.current) {
      return;
    }

    const movie = movies[currentIndex];
    const movieOrSerie = 'release_date' in movie ? 'movie' : 'tv';

    let response = null;

    switch (btnChoice) {
      case 'unwanted':
        response = await handleUnwantedMovieRequest(
          movie.id,
          movieOrSerie,
          !isUnwanted,
        );
        break;
      case 'wanted':
        response = await handleWantedMovieRequest(
          movie.id,
          movieOrSerie,
          !isWanted,
        );
        break;
      case 'watched':
        response = await handleWatchedMovieRequest(
          movie.id,
          movieOrSerie,
          !isWatched,
        );
        break;
      default:
        break;
    }

    if (response.error) {
      setError({ state: true, message: response.error });
    } else {
      handleChoice(btnChoice);
      handleSnackbarMessage(btnChoice);
    }
  };

  // Ouverture du message d'informations suite à une action de l'utilisateur
  const handleOpenSnackbar = useCallback(
    (message: string) => {
      setOpenSnackbar(message);
    },
    [setOpenSnackbar],
  );

  // Fermeture du message d'informations
  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(null);
    isSnackbarVisibleRef.current = false;
  };

  useEffect(() => {
    if (movies.length <= 0) return;

    setIsUnwanted(movies[currentIndex].is_unwanted);
    setIsWanted(movies[currentIndex].is_wanted);
    setIsWatched(movies[currentIndex].is_watched);
  }, [currentIndex, movies]);

  return (
    <>
      <Header page={'swipe'} isTrailerFullscreen={isTrailerFullscreen} />
      <Box
        sx={{
          overflow: 'hidden',
          height: '100vh',
          width: '100vw',
          position: 'relative',
          backgroundColor: '#011212',
        }}
      >
        {movies.length > 0 && (
          <Stack
            position="absolute"
            top="75px"
            right="6%"
            zIndex="1000"
            visibility={isTrailerFullscreen ? 'hidden' : 'visible'}
          >
            <Badge
              badgeContent={countActiveFiltersSwipe(
                typeChosen,
                countryChosen,
                genreChosen,
                ratingChosen,
                periodChosen,
              )}
              showZero
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  color: '#000',
                  backgroundColor: 'secondary.main',
                  fontWeight: '600',
                },
              }}
            >
              <CustomButton
                btntype={'filter'}
                onClick={() => setAreFiltersOpened(!areFiltersOpened)}
              >
                <TuneOutlinedIcon fontSize="medium" />
              </CustomButton>
            </Badge>
            {areFiltersOpened && (
              <SwipeableDrawer
                anchor="left"
                open={areFiltersOpened}
                onClose={() => setAreFiltersOpened(false)}
                onOpen={() => setAreFiltersOpened(true)}
                sx={{
                  '& .MuiDrawer-paper': {
                    height: 'calc(100% - 50px)',
                    width: '35vw',
                    bgcolor: '#101010',
                    top: 'auto',
                    bottom: '0',
                  },
                }}
              >
                <SwipeFilter2
                  typeChosen={typeChosen}
                  setTypeChosen={setTypeChosen}
                  countryChosen={countryChosen}
                  setCountryChosen={setCountryChosen}
                  genreChosen={genreChosen}
                  setGenreChosen={setGenreChosen}
                  ratingChosen={ratingChosen}
                  setRatingChosen={setRatingChosen}
                  periodChosen={periodChosen}
                  setPeriodChosen={setPeriodChosen}
                  setIsFilterValidated={setIsFilterValidated}
                  setAreFiltersOpened={setAreFiltersOpened}
                />
              </SwipeableDrawer>
            )}
          </Stack>
        )}
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Carte Précédente */}
          {previousMovie && (
            <SwipeCard3
              key={previousCardKey} // Utilisation d'une clé unique pour la carte précédente
              movie={previousMovie}
              typeChosen={typeChosen}
              isCurrent={false}
              zIndex={zIndexes.previous}
              onSwipeComplete={onSwipeComplete}
              isFirstCard={false}
              dragDirectionRef={dragDirectionRef}
              setZIndexForSwipe={setZIndexForSwipe}
              showTrailer={null}
              setShowTrailer={null}
              isTrailerFullscreen={null}
              setIsTrailerFullscreen={null}
              setError={null}
            />
          )}

          {/* Carte Courante */}
          {movies.length > 0 && (
            <SwipeCard3
              key={currentCardKey} // Utilisation d'une clé unique pour la carte courante
              movie={currentMovie}
              typeChosen={typeChosen}
              isCurrent={true}
              zIndex={zIndexes.current}
              onSwipeComplete={onSwipeComplete}
              isFirstCard={currentIndex === 0}
              dragDirectionRef={dragDirectionRef}
              setZIndexForSwipe={setZIndexForSwipe}
              showTrailer={showTrailer}
              setShowTrailer={setShowTrailer}
              isTrailerFullscreen={isTrailerFullscreen}
              setIsTrailerFullscreen={setIsTrailerFullscreen}
              setError={setError}
            />
          )}

          {/* Carte Suivante */}
          {nextMovie && (
            <SwipeCard3
              key={nextCardKey} // Utilisation d'une clé unique pour la carte suivante
              movie={nextMovie}
              typeChosen={typeChosen}
              isCurrent={false}
              zIndex={zIndexes.next}
              onSwipeComplete={onSwipeComplete}
              isFirstCard={false}
              dragDirectionRef={dragDirectionRef}
              setZIndexForSwipe={setZIndexForSwipe}
              showTrailer={null}
              setShowTrailer={null}
              isTrailerFullscreen={null}
              setIsTrailerFullscreen={null}
              setError={null}
            />
          )}
        </Box>
        {movies.length > 0 && (
          <Stack
            height="100px"
            width="100%"
            direction="row"
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            zIndex="1100"
            justifyContent="space-between"
            padding="0 6% 15px 6%"
            display={!showTrailer ? 'flex' : 'none'}
          >
            <ChoiceBtn2
              choice={'unwanted'}
              isActive={isUnwanted}
              handleActions={handleActions}
              error={error}
            />
            <ChoiceBtn2
              choice={'wanted'}
              isActive={isWanted}
              handleActions={handleActions}
              error={error}
            />
            <ChoiceBtn2
              choice={'watched'}
              isActive={isWatched}
              handleActions={handleActions}
              error={error}
            />
          </Stack>
        )}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(openSnackbar)}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message={openSnackbar}
      />
      {error.state ? (
        <CustomAlert
          alertType="error"
          message={error.message}
          setOnAlert={setError}
        />
      ) : null}
    </>
  );
};

SwipeComponent3.propTypes = {
  movies: PropTypes.array.isRequired,
  setMovies: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  typeChosen: PropTypes.string.isRequired,
  setTypeChosen: PropTypes.func.isRequired,
  countryChosen: PropTypes.object.isRequired,
  setCountryChosen: PropTypes.func.isRequired,
  genreChosen: PropTypes.object.isRequired,
  setGenreChosen: PropTypes.func.isRequired,
  ratingChosen: PropTypes.object,
  setRatingChosen: PropTypes.func.isRequired,
  periodChosen: PropTypes.object.isRequired,
  setPeriodChosen: PropTypes.func.isRequired,
  setIsFilterValidated: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
};

export default SwipeComponent3;
