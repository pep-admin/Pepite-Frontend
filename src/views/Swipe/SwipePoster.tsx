// Import des libs externes
import { useState, useEffect, useRef } from 'react';
import {
  styled,
  Badge,
  Stack,
  Box,
  CardMedia,
} from '@mui/material';

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

const SwipePoster = ({handleSwipe, movies, movieDetail, currentMovieIndex}) => {

  const [posterWidth, setPosterWidth] = useState(null);

  // Image du film affiché
  const posterRef = useRef<HTMLImageElement | null>(null);

  // Détecte la largeur dynamique de l'image pour pouvoir l'assigner à la div qui contient les notes
  useEffect(() => {
    if (posterRef.current) {
      const posterWidth = posterRef.current.clientWidth;
      setPosterWidth(posterWidth);
    }
  }, [movieDetail, currentMovieIndex]);

  return (
    <Stack
      direction="row"
      sx={{
        height: 'calc(65% - 16.5px)',
        justifyContent: 'space-around',
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
            color: '#0E6666',
          }}
          onClick={() => handleSwipe('left')}
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
          {movies.length > 0 && movies[currentMovieIndex] ? (
            <CardMedia
              ref={posterRef}
              component="img"
              alt={movies[currentMovieIndex].title}
              image={`https://image.tmdb.org/t/p/w500/${movies[currentMovieIndex].poster_path}`}
              sx={{
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : null}
        </StyledBadge>
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
          <SwipeRatings />
        </Stack>
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
          onClick={() => handleSwipe('right')}
        />
      </Box>
    </Stack>
  );
};

export default SwipePoster;