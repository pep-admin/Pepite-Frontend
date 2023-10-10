// Import des libs externes
import { useState, useRef } from 'react';
import { Stack, Box, Button, CardMedia, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Import des fonction qui permettent de manipuler la liste de déjà vus dans la DB
import { addSeenMovie, removeSeenMovie } from '@utils/request/swipe/fetchData';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeRatings from './SwipeRatings';

let isMovieSeen = false;

const SwipePoster = ({
  loading,
  movies,
  setMovies,
  movieDetail,
  index,
  currentMovieIndex,
  generalRatings,
  handleSwipe,
  setSwipeDirection,
}) => {
  // Largeur de l'affiche pour déterminer le container des notes
  const [posterWidth, setPosterWidth] = useState(null);

  // Image du film affiché
  const posterRef = useRef<HTMLImageElement | null>(null);

  const originalScore = generalRatings;
  const scoreOutOfFive = originalScore / 2;
  const roundedScore = parseFloat(scoreOutOfFive.toFixed(1));

  const handleMovieSeen = () => {
    // Inverse la valeur à chaque appel
    isMovieSeen = !isMovieSeen;

    if (isMovieSeen) {
      addSeenMovie(movieDetail[0].id);
    } else {
      removeSeenMovie(movieDetail[0].id);
    }
    // Trouve l'objet du film correspondant dans le tableau movies
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieDetail[0].id) {
        return { ...movie, is_already_seen: isMovieSeen };
      }
      return movie;
    });

    // Met à jour le tableau movies avec la nouvelle valeur
    setMovies(updatedMovies);
  };

  return (
    <Stack
      direction="row"
      sx={{
        height: 'calc(65% - 16.5px)',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {loading.movies || loading.details ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          <Box
            sx={{
              width: '65px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SwipeLeftIcon
              color="error"
              sx={{
                height: '1.3em',
                width: '1.3em',
                color: currentMovieIndex > 0 ? '#0E6666' : '#CCCCCC',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (currentMovieIndex > 0) {
                  handleSwipe('left');
                  setSwipeDirection('left');
                }
              }}
            />
          </Box>
          <Box
            width="calc(100% - 130px)"
            height="100%"
            display="flex"
            justifyContent="center"
            position="relative"
          >
            <Button
              variant="contained"
              color={movies[index].is_already_seen ? 'secondary' : 'primary'}
              sx={{
                height: '29px',
                width: '72px',
                minWidth: 'auto',
                padding: '0',
                position: 'absolute',
                top: '17px',
                right: '-37px',
                borderRadius: '0',
                textTransform: 'none',
                fontWeight: 'normal',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleMovieSeen();
              }}
            >
              {!movies[index].is_already_seen ? 'Déjà vu ?' : 'Déjà vu !'}
            </Button>
            {movies.length > 0 && movies[index] ? (
              <CardMedia
                ref={posterRef}
                component="img"
                alt={movies[index].title}
                image={`https://image.tmdb.org/t/p/w500/${movies[index].poster_path}`}
                sx={{
                  height: '100%',
                  objectFit: 'contain',
                  boxShadow: '8px 7px 12px 0px rgba(0,0,0,0.24)',
                }}
                onLoad={() => {
                  if (posterRef.current) {
                    setPosterWidth(posterRef.current.clientWidth);
                  }
                }}
              />
            ) : null}

            {posterWidth !== null ? (
              <Stack
                position="absolute"
                bottom="0"
                left="50%"
                height="fit-content"
                width={posterWidth}
                sx={{
                  padding: '6px 6px 0 15px',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <SwipeRatings roundedScore={roundedScore} />
              </Stack>
            ) : null}
          </Box>
          <Box
            sx={{
              width: '65px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SwipeRightIcon
              sx={{
                height: '1.3em',
                width: '1.3em',
                color: '#0E6666',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleSwipe('right');
                setSwipeDirection('right');
              }}
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

const SwipePosterPropTypes = {
  movies: PropTypes.array.isRequired,
  setMovies: PropTypes.func.isRequired,
  movieDetail: PropTypes.array.isRequired,
  generalRatings: PropTypes.number.isRequired,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleSwipe: PropTypes.func.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

SwipePoster.propTypes = SwipePosterPropTypes;

export default SwipePoster;
