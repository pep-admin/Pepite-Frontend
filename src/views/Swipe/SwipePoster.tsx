// Import des libs externes
import { useState, useEffect, useRef } from 'react';
import { Stack, Box, Button, CardMedia, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Import des fonction qui permettent de manipuler la liste de déjà vus dans la DB
import {
  addSeenMovie,
  addUnwantedMovie,
  cancelDeletedMovie,
  removeSeenMovie,
} from '@utils/request/swipe/fetchData';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeRatings from './SwipeRatings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

// Import du contexte
import { useData } from '@hooks/DataContext';

const SwipePoster = ({
  loading,
  movies,
  setMovies,
  movieDetail,
  index,
  currentMovieIndex,
  setCurrentMovieIndex,
  generalRatings,
  setSwipeDirection,
}) => {
  const { displayType } = useData();

  // Largeur de l'affiche pour déterminer le container des notes
  const [posterWidth, setPosterWidth] = useState(null);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  // Image du film affiché
  const posterRef = useRef<HTMLImageElement | null>(null);
  const isMovieSeenRef = useRef(false);
  const isMovieDeletedRef = useRef(false);

  const originalScore = generalRatings;
  const scoreOutOfFive = originalScore / 2;
  const roundedScore = parseFloat(scoreOutOfFive.toFixed(1));

  const handleMovieSeen = () => {
    if (!isMovieSeenRef.current && !movies[index].is_already_seen) {
      addSeenMovie(movieDetail.id, displayType);
      isMovieSeenRef.current = true;
    } else {
      removeSeenMovie(movieDetail.id, displayType);
      isMovieSeenRef.current = false;
    }
    // Trouve l'objet du film correspondant dans le tableau movies
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieDetail.id) {
        return { ...movie, is_already_seen: isMovieSeenRef.current };
      }
      return movie;
    });
    // Met à jour le tableau movies avec la nouvelle valeur
    setMovies(updatedMovies);
  };

  const handleDeleteMovie = () => {
    if (!isMovieDeletedRef.current && !movies[index].is_deleted) {
      addUnwantedMovie(movieDetail.id, displayType);
      isMovieDeletedRef.current = true;
    } else {
      cancelDeletedMovie(movieDetail.id, displayType);
      isMovieDeletedRef.current = false;
    }
    // Trouve l'objet du film correspondant dans le tableau movies
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieDetail.id) {
        return { ...movie, is_deleted: isMovieDeletedRef.current };
      }
      return movie;
    });
    // Met à jour le tableau movies avec la nouvelle valeur
    setMovies(updatedMovies);
  };

  useEffect(() => {
    if (movieDetail && currentMovieId !== movieDetail.id) {
      isMovieSeenRef.current = false; // Réinitialisation à false lorsque le film change
      setCurrentMovieId(movieDetail.id); // Id du film actuel
    }
  }, [movieDetail, currentMovieId]);

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
                backgroundColor: !movies[index].is_deleted
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
              {!movies[index].is_deleted ? (
                <DeleteForeverIcon />
              ) : (
                <RestoreFromTrashIcon />
              )}
            </Button>
            {movies.length > 0 && movies[index] ? (
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
                    filter: movies[index].is_deleted ? 'grayscale(1)' : 'none',
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
                      movies[index].is_deleted || movies[index].is_wanted
                        ? '#000000bf'
                        : 'transparent',
                    clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)',
                  }}
                >
                  {movies[index].is_deleted ? (
                    <ClearIcon
                      sx={{
                        fontSize: '2.5em',
                        color: '#f25050',
                      }}
                    />
                  ) : !movies[index].is_deleted && movies[index].is_wanted ? (
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
  setMovies: PropTypes.func.isRequired,
  movieDetail: PropTypes.object.isRequired,
  generalRatings: PropTypes.number.isRequired,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

SwipePoster.propTypes = SwipePosterPropTypes;

export default SwipePoster;
