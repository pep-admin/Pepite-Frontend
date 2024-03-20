// Import des libs externes
import { Alert, Stack, Badge, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { animated as a } from 'react-spring';

// Import des composants internes
import SwipeContent from './SwipeContent';
import SwipeFilter from './SwipeFilter';
import { CustomButton } from './CustomBtn';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

// Import des variables d'environnements
import { assetsBaseUrl } from '@utils/request/config';

const SwipeCard = ({
  id,
  movies,
  movieDetail,
  error,
  index,
  currentMovieIndex,
  setCurrentMovieIndex,
  setSwipeAction,
  cardProps,
  moviesStatusUpdated,
  setMoviesStatusUpdated,
  swipeToTheRight,
  countryChosen,
  setCountryChosen,
  genreChosen,
  setGenreChosen,
  ratingChosen,
  setRatingChosen,
  setIsFilterValidated,
  swipeType,
  setSwipeType,
}) => {
  const AnimatedCard = a(Stack);

  const [showMovieInfos, setShowMovieInfos] = useState(false);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [continentChosen, setContinentChosen] = useState('Amérique'); // Continent choisi par l'utilisateur

  const toggleFilters = open => event => {
    // Ignorer les événements qui ont été déclenchés par des éléments non souhaités
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setAreFiltersOpen(open);
  };

  return (
    <AnimatedCard
      id={id}
      style={cardProps}
      sx={{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        boxShadow: 'none',
      }}
    >
      {error.error !== null ? (
        <Alert
          severity="error"
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {error.message}
        </Alert>
      ) : (
        movies[index] && (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              height: '100%',
              backgroundImage: `linear-gradient(
                to top,
                ${
                  !showMovieInfos
                    ? 'rgba(1, 18, 18, 1) 0%, rgba(1, 18, 18, 1) 20%, rgba(1, 18, 18, 0.6) 50%, rgba(1, 18, 18, 0) 100%'
                    : 'rgba(1, 18, 18, 1) 0%, rgba(1, 18, 18, 0.97) 30%, rgba(1, 18, 18, 0.5) 85%, rgba(1, 18, 18, 0) 100%'
                }
              ), url(${
                movies[index].poster_path !== null
                  ? `https://image.tmdb.org/t/p/original/${movies[index].poster_path}`
                  : `${assetsBaseUrl}/images/no_poster.jpg`
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '0 6%',
            }}
          >
            <Stack position="absolute" top="75px" right="6%">
              <Badge
                badgeContent={0}
                showZero
                overlap="circular"
                sx={{
                  '& .MuiBadge-badge': {
                    color: '#000',
                    backgroundColor: 'secondary.main',
                  },
                }}
              >
                <CustomButton btntype={'filter'} onClick={toggleFilters(true)}>
                  <TuneOutlinedIcon fontSize="medium" />
                </CustomButton>
              </Badge>
              {areFiltersOpen && (
                <SwipeableDrawer
                  anchor="left"
                  open={areFiltersOpen}
                  onClose={toggleFilters(false)}
                  onOpen={toggleFilters(true)}
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
                  <SwipeFilter
                    swipeType={swipeType}
                    setSwipeType={setSwipeType}
                    continentChosen={continentChosen}
                    setContinentChosen={setContinentChosen}
                    countryChosen={countryChosen}
                    setCountryChosen={setCountryChosen}
                    genreChosen={genreChosen}
                    setGenreChosen={setGenreChosen}
                    ratingChosen={ratingChosen}
                    setRatingChosen={setRatingChosen}
                    setIsFilterValidated={setIsFilterValidated}
                    setAreFiltersOpen={setAreFiltersOpen}
                  />
                </SwipeableDrawer>
              )}
            </Stack>
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              position="absolute"
              top="50%"
              padding="0 6%"
              sx={{
                transform: 'translateY(-50%)',
                display: showMovieInfos ? 'none' : 'flex',
              }}
            >
              <SwipeLeftIcon
                color="error"
                sx={{
                  height: '1.3em',
                  width: '1.3em',
                  color: currentMovieIndex > 0 ? '#ffffffa3' : '#ffffff42',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (currentMovieIndex > 0) {
                    setSwipeAction({ direction: 'left', from: 'normal' });
                    if (currentMovieIndex !== -1) {
                      setCurrentMovieIndex(prevIndex => prevIndex - 1);
                    }
                  }
                }}
              />
              <SwipeRightIcon
                sx={{
                  height: '1.3em',
                  width: '1.3em',
                  color: '#ffffffa3',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSwipeAction({ direction: 'right', from: 'normal' });

                  // Si ni la dernière card, ni la card "plus aucun film" est affichée, on incrémente normalement
                  if (currentMovieIndex !== movies.length - 1) {
                    setCurrentMovieIndex(prevIndex => prevIndex + 1);
                  }
                  // Si la dernière card de movies est affichée, on définit l'index courant sur -1
                  else {
                    setCurrentMovieIndex(-1);
                  }
                }}
              />
            </Stack>
            <SwipeContent
              movieDetail={movieDetail}
              movies={movies}
              index={index}
              showMovieInfos={showMovieInfos}
              setShowMovieInfos={setShowMovieInfos}
              moviesStatusUpdated={moviesStatusUpdated}
              setMoviesStatusUpdated={setMoviesStatusUpdated}
              currentMovieIndex={currentMovieIndex}
              setCurrentMovieIndex={setCurrentMovieIndex}
              swipeToTheRight={swipeToTheRight}
              swipeType={swipeType}
            />
          </Stack>
        )
      )}
    </AnimatedCard>
  );
};

SwipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  currentMovieIndex: PropTypes.number,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  setSwipeAction: PropTypes.func.isRequired,
  cardProps: PropTypes.object.isRequired,
  moviesStatusUpdated: PropTypes.array.isRequired,
  setMoviesStatusUpdated: PropTypes.func.isRequired,
  swipeToTheRight: PropTypes.func.isRequired,
  countryChosen: PropTypes.object,
  setCountryChosen: PropTypes.func.isRequired,
  genreChosen: PropTypes.object,
  setGenreChosen: PropTypes.func.isRequired,
  ratingChosen: PropTypes.object,
  setRatingChosen: PropTypes.func.isRequired,
  setIsFilterValidated: PropTypes.func.isRequired,
  swipeType: PropTypes.string.isRequired,
  setSwipeType: PropTypes.func.isRequired,
};

export default SwipeCard;
