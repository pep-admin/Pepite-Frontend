// Import des libs externes
import { useState, useEffect, useRef } from 'react';
import {
  Stack,
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import SwipeRatings from './SwipeRatings';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { addWatchedMovieRequest } from '@utils/request/list/addWatchedMovieRequest';
import { removeWatchedMovieRequest } from '@utils/request/list/removeWatchedMovieRequest';
import { addUnwantedMovieRequest } from '@utils/request/list/addUnwantedMovieRequest';
import { recoverUnwantedMovieRequest } from '@utils/request/list/recoverUnwantedMovieRequest';

const SwipePoster = ({
  movies,
  loading,
  index,
  currentMovieIndex,
  setCurrentMovieIndex,
  setSwipeDirection,
  moviesStatusUpdated,
  setMoviesStatusUpdated,
}) => {
  const { displayType } = useData();

  // Largeur de l'affiche pour déterminer le container des notes
  const [posterWidth, setPosterWidth] = useState(null);

  const isWatchedRef = useRef(
    moviesStatusUpdated[currentMovieIndex]?.is_watched,
  );
  const isUnwantedRef = useRef(
    moviesStatusUpdated[currentMovieIndex]?.is_unwanted,
  );

  // Image du film affiché
  const posterRef = useRef<HTMLImageElement | null>(null);

  // Indique un film / série comme déjà vu, ou permet à l'utilisateur de revenir sur sa décision
  const handleMovieWatched = async () => {
    const updatedMovies = moviesStatusUpdated.map(movie => {
      if (movie.id === moviesStatusUpdated[currentMovieIndex].id) {
        return { ...movie, is_watched: !isWatchedRef.current };
      }
      return movie;
    });

    if (!isWatchedRef.current) {
      await addWatchedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    } else {
      await removeWatchedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    }

    setMoviesStatusUpdated(updatedMovies);
    isWatchedRef.current = !isWatchedRef.current;
  };

  // Indique un film / série comme non voulu, ou permet à l'utilisateur de revenir sur sa décision
  const handleDeleteMovie = async () => {
    const updatedMovies = moviesStatusUpdated.map(movie => {
      if (movie.id === moviesStatusUpdated[currentMovieIndex].id) {
        return { ...movie, is_unwanted: !isUnwantedRef.current };
      }
      return movie;
    });

    if (!isUnwantedRef.current) {
      await addUnwantedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    } else {
      await recoverUnwantedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    }

    setMoviesStatusUpdated(updatedMovies);
    isUnwantedRef.current = !isUnwantedRef.current;
  };

  // Réinitialisation des refs "est déjà vu", "n'est pas voulu", "est voulu" à chaque fois que l'utilisateur swipe
  useEffect(() => {
    isWatchedRef.current = moviesStatusUpdated[currentMovieIndex]?.is_watched;
    isUnwantedRef.current = moviesStatusUpdated[currentMovieIndex]?.is_unwanted;
  }, [currentMovieIndex]);

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
                  setSwipeDirection('left');
                  if (currentMovieIndex !== -1) {
                    setCurrentMovieIndex(prevIndex => prevIndex - 1);
                  }
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
              sx={{
                backgroundColor: !moviesStatusUpdated[index].is_unwanted
                  ? '#f25050 !important'
                  : '#5AC164',
                height: '29px',
                width: '29px',
                minWidth: 'auto',
                padding: '0',
                position: 'absolute',
                top: '17px',
                right: 'calc(100% - 16px)',
                borderRadius: '0',
                textTransform: 'none',
                fontWeight: 'normal',
                zIndex: 2,
                cursor: 'pointer',
              }}
              onClick={() => {
                handleDeleteMovie();
              }}
            >
              {!moviesStatusUpdated[index].is_unwanted ? (
                <DeleteForeverIcon />
              ) : (
                <RestoreFromTrashIcon />
              )}
            </Button>
            {moviesStatusUpdated.length > 0 && moviesStatusUpdated[index] ? (
              <>
                <CardMedia
                  ref={posterRef}
                  component="img"
                  alt={movies[index].title}
                  image={
                    movies[index].poster_path !== null
                      ? `https://image.tmdb.org/t/p/w500/${movies[index].poster_path}`
                      : 'http://127.0.0.1:5173/images/no_poster.jpg'
                  }
                  sx={{
                    height: '100%',
                    objectFit: 'contain',
                    boxShadow: '8px 7px 12px 0px rgba(0,0,0,0.24)',
                    filter: moviesStatusUpdated[index].is_unwanted
                      ? 'grayscale(1)'
                      : 'none',
                  }}
                  onLoad={() => {
                    if (posterRef.current) {
                      setPosterWidth(posterRef.current.clientWidth);
                    }
                  }}
                />
                <Box
                  height="45px"
                  width="60px"
                  position="absolute"
                  top="30%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    backgroundColor:
                      moviesStatusUpdated[index].is_unwanted ||
                      moviesStatusUpdated[index].is_wanted
                        ? '#000000bf'
                        : 'transparent',
                    clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)',
                  }}
                >
                  {moviesStatusUpdated[index].is_unwanted ? (
                    <ClearIcon
                      sx={{
                        fontSize: '2.5em',
                        color: '#f25050',
                      }}
                    />
                  ) : !moviesStatusUpdated[index].is_unwanted &&
                    moviesStatusUpdated[index].is_wanted ? (
                    <PlaylistAddIcon
                      sx={{
                        fontSize: '2.5em',
                        color: '#5AC164',
                      }}
                    />
                  ) : null}
                </Box>
              </>
            ) : null}
            <Button
              variant="contained"
              color={
                moviesStatusUpdated[index].is_watched ? 'success' : 'primary'
              }
              sx={{
                height: '29px',
                width: '70px',
                minWidth: 'auto',
                padding: '0',
                position: 'absolute',
                top: '17px',
                right: '-37px',
                borderRadius: '0',
                textTransform: 'none',
                fontWeight: 'normal',
                cursor: 'pointer',
                color: '#fff',
              }}
              onClick={() => {
                handleMovieWatched();
              }}
            >
              {!moviesStatusUpdated[index].is_watched ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  columnGap="5px"
                  paddingRight="1px"
                >
                  <VisibilityOffIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    component="span"
                    lineHeight="10px"
                  >
                    {'Non vu'}
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  columnGap="5px"
                  paddingRight="1px"
                >
                  <VisibilityIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    component="span"
                    lineHeight="10px"
                  >
                    {'Déjà vu'}
                  </Typography>
                </Stack>
              )}
            </Button>
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
                <SwipeRatings
                  movies={movies}
                  index={index}
                  currentMovieIndex={currentMovieIndex}
                />
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
                setSwipeDirection('right');

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
          </Box>
        </>
      )}
    </Stack>
  );
};

const SwipePosterPropTypes = {
  movies: PropTypes.array.isRequired,
  moviesStatusUpdated: PropTypes.array.isRequired,
  setMoviesStatusUpdated: PropTypes.func,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

SwipePoster.propTypes = SwipePosterPropTypes;

export default SwipePoster;
