// Import des libs externes
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import { CustomButton } from './CustomBtn';

// Import des icônes
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { addWatchedMovieRequest } from '@utils/request/list/addWatchedMovieRequest';
import { removeWatchedMovieRequest } from '@utils/request/list/removeWatchedMovieRequest';
import { addUnwantedMovieRequest } from '@utils/request/list/addUnwantedMovieRequest';
import { recoverUnwantedMovieRequest } from '@utils/request/list/recoverUnwantedMovieRequest';
import { addWantedMovieRequest } from '@utils/request/list/addWantedMovieRequest';
import { removeWantedMovieRequest } from '@utils/request/list/removeWantedMovieRequest';

// Utilisation du bouton personnalisé dans un composant
const ChoiceBtn = ({
  choice,
  moviesStatusUpdated,
  setMoviesStatusUpdated,
  index,
  currentMovieIndex,
  setCurrentMovieIndex,
  swipeToTheRight,
}) => {
  const { displayType } = useData();

  const isUnwantedRef = useRef(
    moviesStatusUpdated[currentMovieIndex]?.is_unwanted,
  );
  const isWantedRef = useRef(moviesStatusUpdated[currentMovieIndex]?.is_wanted);
  const isWatchedRef = useRef(
    moviesStatusUpdated[currentMovieIndex]?.is_watched,
  );

  // Indique un film / série comme non voulu, ou permet à l'utilisateur de revenir sur sa décision
  const handleUnwantedMovie = async () => {
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

      setTimeout(() => {
        swipeToTheRight();
        if (currentMovieIndex !== moviesStatusUpdated.length - 1) {
          setCurrentMovieIndex(prevIndex => prevIndex + 1);
        }
        // Si la dernière card de movies est affichée, on définit l'index courant sur -1
        else {
          setCurrentMovieIndex(-1);
        }
      }, 300);
    } else {
      await recoverUnwantedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    }

    setMoviesStatusUpdated(updatedMovies);
    isUnwantedRef.current = !isUnwantedRef.current;
  };

  const handleWantedMovie = async () => {
    const updatedMovies = moviesStatusUpdated.map(movie => {
      if (movie.id === moviesStatusUpdated[currentMovieIndex].id) {
        return { ...movie, is_wanted: !isWantedRef.current };
      }
      return movie;
    });

    if (!isWantedRef.current) {
      await addWantedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    } else {
      await removeWantedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    }

    setMoviesStatusUpdated(updatedMovies);
    isWantedRef.current = !isWantedRef.current;
  };

  // Indique un film / série comme déjà vu, ou permet à l'utilisateur de revenir sur sa décision
  const handleWatchedMovie = async () => {
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

      setTimeout(() => {
        swipeToTheRight();
        if (currentMovieIndex !== moviesStatusUpdated.length - 1) {
          setCurrentMovieIndex(prevIndex => prevIndex + 1);
        }
        // Si la dernière card de movies est affichée, on définit l'index courant sur -1
        else {
          setCurrentMovieIndex(-1);
        }
      }, 300);
    } else {
      await removeWatchedMovieRequest(
        moviesStatusUpdated[currentMovieIndex].id,
        displayType,
      );
    }

    setMoviesStatusUpdated(updatedMovies);
    isWatchedRef.current = !isWatchedRef.current;
  };

  // Réinitialisation des refs "non souhaité", "souhaité", "déjà vu" à chaque fois que l'utilisateur swipe
  useEffect(() => {
    isUnwantedRef.current = moviesStatusUpdated[index]?.is_unwanted;
    isWantedRef.current = moviesStatusUpdated[index]?.is_wanted;
    isWatchedRef.current = moviesStatusUpdated[index]?.is_watched;
  }, [index]);

  return (
    <Stack alignItems="center">
      <CustomButton
        variant="contained"
        btntype={'others'}
        choice={choice}
        isunwanted={isUnwantedRef.current}
        iswanted={isWantedRef.current}
        iswatched={isWatchedRef.current}
        onClick={
          choice === 'unwanted'
            ? handleUnwantedMovie
            : choice === 'wanted'
            ? handleWantedMovie
            : handleWatchedMovie
        }
      >
        {choice === 'unwanted' ? (
          <DeleteForeverOutlinedIcon fontSize="large" />
        ) : choice === 'wanted' ? (
          <ThumbUpOutlinedIcon fontSize="large" />
        ) : (
          <RemoveRedEyeOutlinedIcon fontSize="large" />
        )}
      </CustomButton>
      {choice === 'unwanted' ? (
        <Typography
          fontSize="2vh"
          color="#fff"
          fontWeight="100"
          marginTop="5px"
        >
          {'Non souhaité'}
        </Typography>
      ) : choice === 'wanted' ? (
        <Typography
          fontSize="2vh"
          color="#fff"
          fontWeight="100"
          marginTop="5px"
        >
          {'Souhaité'}
        </Typography>
      ) : (
        <Typography
          fontSize="2vh"
          color="#fff"
          fontWeight="100"
          marginTop="5px"
        >
          {'Déjà vu'}
        </Typography>
      )}
    </Stack>
  );
};

ChoiceBtn.propTypes = {
  choice: PropTypes.string.isRequired,
  moviesStatusUpdated: PropTypes.array.isRequired,
  setMoviesStatusUpdated: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  swipeToTheRight: PropTypes.func,
};

export default React.memo(ChoiceBtn);
