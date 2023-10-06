// Import des libs externes
import { useState, useRef } from 'react';
import {
  styled,
  Badge,
  Stack,
  Box,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeRatings from './SwipeRatings';

// Badge rectangulaire customisé "déjà vu ?"
const StyledBadge = styled(Badge)(() => ({
  '.MuiBadge-standard': {
    top: '28px',
    right: '-10px',
    borderRadius: 0,
    height: '27px',
  },
  '.MuiBadge-anchorOriginTopRightRectangle': {
    top: '28px',
    right: '-10px',
    borderRadius: 0,
    height: '27px',
  },
}));

const SwipePoster = ({
  loading,
  movies,
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
            <StyledBadge
              variant="standard"
              badgeContent={'Déjà vu ?'}
              color="primary"
              overlap="rectangular"
            >
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
            </StyledBadge>
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
  generalRatings: PropTypes.number.isRequired,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleSwipe: PropTypes.func.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

SwipePoster.propTypes = SwipePosterPropTypes;

export default SwipePoster;
