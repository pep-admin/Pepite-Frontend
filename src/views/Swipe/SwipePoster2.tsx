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

// Import des variables d'environnement
import { assetsBaseUrl } from '@utils/request/config';

const SwipePoster2 = ({
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

  console.log('le poster', movies);
  

  return (
    <Stack
      direction="row"
      sx={{
        height: 'calc(100vh - 50px)',
        width: '100%',
        position: 'absolute',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundImage: `url(${
        //   movies[index].poster_path !== null
        //     ? `https://image.tmdb.org/t/p/original/${movies[index].poster_path}`
        //     : `${assetsBaseUrl}/images/no_poster.jpg`
        // })`,
        // backgroundSize: 'cover', 
        // backgroundPosition: 'center',
        // zIndex: '-1'
      }}
    >
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
    </Stack>
  );
};

SwipePoster2.propTypes = {
  movies: PropTypes.array.isRequired,
  moviesStatusUpdated: PropTypes.array.isRequired,
  setMoviesStatusUpdated: PropTypes.func,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

export default SwipePoster2;
