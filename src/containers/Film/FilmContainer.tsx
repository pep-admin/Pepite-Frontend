import { Box, CircularProgress, Stack } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';
import { getMovieDetailsRequest } from '@utils/request/getMovieDetailsRequest';
import FilmComponent from '@views/Film/FilmComponent';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorState, MovieDetails } from 'types/interface';

const FilmContainer = ({ display, movie, onClose }) => {

  const { movieOrSerie, id } = useParams();

  let isMovieOrSerie: string;
  let movieId : number;

  if(display === 'full-page') {
    isMovieOrSerie = movieOrSerie;
    movieId = parseInt(id, 10);
    console.log(isMovieOrSerie, movieId);
    
  } else {
    isMovieOrSerie = findIfMovieOrSerie(movie);
    movieId = movie.id;
  }

  const [movieDetails, setMovieDetails] = useState<MovieDetails>({}); 
  const [areDetailsLoading, setAreDetailsLoading] = useState(true);
  const [error, setError] = useState<ErrorState>({
    state: null,
    message: ''
  })

  const getMovieDetails = async() => {
    try {      
      setAreDetailsLoading(true);

      const details = await getMovieDetailsRequest(isMovieOrSerie, movieId);
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
  }, [id]);

  return (
    <Box
      height='auto'
      minHeight='100vh' 
      width='100vw' 
      bgcolor='#011212'
    >
      { // Si on affiche le film sur une nouvelle page
        display === 'full-page' ?
          <>
            <Header2 page={'Film'} isTrailerFullscreen={null} />
            {
              !areDetailsLoading ?
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
              :
              <Stack height='calc(100vh - 56px)' justifyContent='center' alignItems='center' >
                <CircularProgress color='secondary' sx={{ height: '15vw', width: '15vw'}}/>  
              </Stack>
            }
          </>
        :
        // Si on affiche le film en mode swipe depuis la page Home
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
      }
    </Box>
  );
};

export default FilmContainer;