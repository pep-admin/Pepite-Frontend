import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FilmPresentation from './FilmPresentation';
import { useEffect, useState } from 'react';
import { ErrorState, MovieDetails } from 'types/interface';
import FilmOverview from './FilmOverview';
import FilmReviews from './FilmReviews';
import FilmCredits from './FilmCredits';
import FilmSimilar from './FilmSimilar';
import { getMovieDetailsRequest } from '@utils/request/getMovieDetailsRequest';
import FilmExternalLinks from './FilmExternalLinks';

const FilmComponent = ({ movie }) => {
  if(!movie) return;

  console.log('le film !', movie);
  const theme = useTheme();

  const isMovieOrSerie = 'release_date' in movie ? 'movie' : 'tv';

  const [movieDetails, setMovieDetails] = useState<MovieDetails>({});
  const [areDetailsLoading, setAreDetailsLoading] = useState(true);
  const [error, setError] = useState<ErrorState>({
    state: null,
    message: ''
  })

  const getMovieDetails = async() => {
    try {
      setAreDetailsLoading(true);

      const details = await getMovieDetailsRequest(isMovieOrSerie, movie.id);
      setMovieDetails(details);
      console.log('les détails =>', details);
      
    } catch (err) {
      setError({
        state: true,
        message: 'Erreur dans la récupération des détails du film.',
      });

    }finally {
      setAreDetailsLoading(false);
    }
  }

  useEffect(() => {
    getMovieDetails();
  }, []);

  
  return (
    <Box 
      height='auto'
      minHeight='100vh' 
      width='100vw' 
      bgcolor='#011212'
    >
      {/* Puller visuel de swipe retour */}
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
      <Box
         sx={{
          position: 'relative', // Important pour que l'enfant pseudo-élément se positionne par rapport à cet élément
          height: '40vh',
          width: '100vw',
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""', // Nécessaire pour créer le pseudo-élément
            position: 'absolute', // Positionnement absolu par rapport à l'élément parent
            bottom: '-1px',
            left: 0,
            width: '100%',
            height: '101%',
            background: 'linear-gradient(180deg, rgba(1,18,18,0.42) 0%, rgba(1,18,18,0.40) 80%, rgba(1,18,18,1) 100%)',
            zIndex: 1, // Met le pseudo-élément au-dessus de l'image de fond
          },
        }}  
      >
        <Typography
          fontFamily='League Spartan, sans-serif'
          color={theme.palette.text.primary}
          sx={{
            position: 'relative', 
            zIndex: 2, 
            padding: '17px 0 0 22px'
          }}
        >
          Retour aux films
        </Typography>
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
        <FilmOverview movie={movie} />
        <Box>
          <FilmReviews reviewsFrom={'amis'} />
          <FilmReviews reviewsFrom={'suivis'} />
        </Box>
        <FilmCredits 
          isMovieOrSerie={isMovieOrSerie} 
          movie={movie} 
        />
        <FilmSimilar 
          isMovieOrSerie={isMovieOrSerie} 
          movieDetails={movieDetails} 
        />
        <FilmExternalLinks
          isMovieOrSerie={isMovieOrSerie}
          movie={movie}
        />
      </Stack>  
    </Box>
  );
};

export default FilmComponent;