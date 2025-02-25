import { Box, Stack, Typography } from '@mui/material';
import FilmPresentation from './FilmPresentation';
import FilmOverview from './FilmOverview';
import FilmReviews from './FilmReviews';
import FilmCredits from './FilmCredits';
import FilmSimilar from './FilmSimilar';
import FilmExternalLinks from './FilmExternalLinks';
import { useState } from 'react';
import { Credits } from 'types/interface';

const FilmComponent = ({
  display,
  movie,
  movieDetails,
  isMovieOrSerie,
  areDetailsLoading,
  onClose,
  error,
  setError,
  onNavigate,
}) => {
  const [movieCredits, setMovieCredits] = useState<Credits>({});
  const [directorData, setDirectorData] = useState({
    id: null,
    job: null,
    name: null,
  });

  console.log('le film enculé =>', movie);

  return (
    <>
      {
        // Si la page est swipable, on affiche un puller visuel
        display === 'swipeable' && (
          <Box
            sx={{
              height: '75px',
              width: '8px',
              position: 'fixed',
              top: '50%',
              right: '5px',
              transform: 'translateY(-50%)',
              backgroundColor: '#3a3a3a',
              borderRadius: '20px',
            }}
          />
        )
      }
      <Box
        sx={{
          position: 'relative',
          height: '40vh',
          width: '100vw',
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            width: '100%',
            height: '101%',
            background:
              'linear-gradient(180deg, rgba(1,18,18,0.42) 0%, rgba(1,18,18,0.40) 80%, rgba(1,18,18,1) 100%)',
            zIndex: 1,
          },
        }}
      >
        {display === 'swipeable' && (
          <Typography
            fontFamily="League Spartan, sans-serif"
            color="#c6c6c6"
            sx={{
              position: 'relative',
              zIndex: 2,
              padding: '17px 0 0 22px',
            }}
            onClick={onClose}
          >
            {"Retour à l'accueil"}
          </Typography>
        )}
      </Box>
      <Stack>
        <FilmPresentation
          movie={movie}
          movieDetails={movieDetails}
          isMovieOrSerie={isMovieOrSerie}
          areDetailsLoading={areDetailsLoading}
          error={error}
          setError={setError}
        />
        <FilmOverview movie={movie} isMovieOrSerie={isMovieOrSerie} />
        <Box>
          <FilmReviews reviewsFrom={'amis'} />
          <FilmReviews reviewsFrom={'suivis'} />
        </Box>
        <FilmCredits
          isMovieOrSerie={isMovieOrSerie}
          movie={movie}
          movieCredits={movieCredits}
          setMovieCredits={setMovieCredits}
          setDirectorData={setDirectorData}
        />
        <FilmSimilar
          isMovieOrSerie={isMovieOrSerie}
          movieId={movieDetails.id}
          directorData={directorData}
          onNavigate={onNavigate}
        />
        <FilmExternalLinks isMovieOrSerie={isMovieOrSerie} movie={movie} />
      </Stack>
    </>
  );
};

export default FilmComponent;
