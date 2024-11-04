import { Box, CircularProgress, Stack } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';
import { getAndStoreMovieDetails } from '@utils/functions/getAndStoreMovieDetails';
import FilmComponent from '@views/Film/FilmComponent';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorState, MovieDetails } from 'types/interface';

const FilmContainer = ({ display, movie, onClose }) => {
  const { movieOrSerie, id } = useParams();

  let isMovieOrSerie = movieOrSerie;
  let movieId = parseInt(id, 10);

  // Si le composant est monté depuis la page Home
  if (display !== 'full-page') {        
    isMovieOrSerie = findIfMovieOrSerie(movie);
    movieId = movie.id;
  }

  const [movieDetails, setMovieDetails] = useState<MovieDetails>({});
  const [areDetailsLoading, setAreDetailsLoading] = useState(true);
  const [error, setError] = useState<ErrorState>({
    state: null,
    message: ''
  });

  const getMovieDetails = async () => {
    try {
      await getAndStoreMovieDetails(isMovieOrSerie, movieId, setMovieDetails);
    } catch (err) {
      setError({
        state: true,
        message: 'Erreur dans la récupération des détails du film.',
      });
    } finally {
      setAreDetailsLoading(false);
    }
  };

  useEffect(() => {
    console.log('RESET');
    
    setAreDetailsLoading(true);
    setMovieDetails({});
    getMovieDetails();
  }, [isMovieOrSerie, movieId]); // Ajout de `isMovieOrSerie` comme dépendance

  return (
    <Box height='auto' minHeight='100vh' width='100vw' bgcolor='#011212'>
      { display === 'full-page' ? (
          <>
            <Header2 page={'Film'} isTrailerFullscreen={null} />
            {!areDetailsLoading && movieDetails.backdrop_path && (movieDetails.release_date || movieDetails.first_air_date) ? (
              <FilmComponent
                display={display}
                movie={movieDetails}
                movieDetails={movieDetails}
                isMovieOrSerie={isMovieOrSerie}
                areDetailsLoading={areDetailsLoading}
                onClose={onClose}
                error={error}
                setError={setError}
              />
            ) : (
              <Stack height='calc(100vh - 56px)' justifyContent='center' alignItems='center'>
                <CircularProgress color='secondary' sx={{ height: '15vw', width: '15vw' }} />
              </Stack>
            )}
          </>
        ) : (
          <FilmComponent
            display={display}
            movie={movie}
            movieDetails={movieDetails}
            isMovieOrSerie={isMovieOrSerie}
            areDetailsLoading={areDetailsLoading}
            onClose={onClose}
            error={error}
            setError={setError}
          />
        )}
    </Box>
  );
};

export default FilmContainer;
