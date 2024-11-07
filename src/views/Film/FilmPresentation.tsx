import { Stack, Box, Typography, useTheme, Skeleton, Divider, Container } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ErrorState, Movie, MovieDetails } from 'types/interface';
import FilmRating from './FilmRating';

interface FilmPresentationProps {
  movie: Movie;
  movieDetails: MovieDetails; 
  isMovieOrSerie: string;
  areDetailsLoading: boolean;
  error: ErrorState;
  setError: Dispatch<SetStateAction<ErrorState>>;
}

const FilmPresentation: React.FC<FilmPresentationProps> = ({ 
  movie, 
  movieDetails,
  isMovieOrSerie, 
  areDetailsLoading,
  setError 
}) => {
  console.log(movieDetails);
  
  const theme = useTheme();
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;
  const movieDate = isMovieOrSerie === 'movie' ? movie.release_date : movie.first_air_date;

  console.log(movieDate);
  return (
    <Container
      sx={{
        position: 'relative',
        zIndex: '2',
        paddingLeft: '5vw',
        paddingRight: '5vw'
      }}
    >
      <Box
        sx={{
          height: '34vh',
          width: '24vh',
          position: 'absolute',
          top: '-16vh',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          outline: '1px solid #1F1F1F'
        }}
      />
      <Stack marginTop='22vh' spacing={4} alignItems='center'>
        <Stack alignItems='center' width='100%'>
          <Typography
            component='h1'
            align='center'
            color={theme.palette.text.primary}
            fontFamily='League Spartan, sans-serif'
            fontSize='2em'
            fontWeight='300'
            lineHeight='1.25'
          >
            {`${movieTitle}`}
          </Typography>
          {
            areDetailsLoading ?
            <>
              <Skeleton variant='text' animation='wave' sx={{ fontSize: '1em', width:'30%' }} />
              <Skeleton variant='text' animation='wave' sx={{ fontSize: '0.9em', width:'50%', marginTop: '15px' }} />
            </>
            :
            <>
              <Typography
                align='center'
                color='secondary'
                fontFamily='Pragati Narrow, sans-serif'
                fontSize='1em'
                fontWeight='300'
                lineHeight='1.25'
              >
                {`${isMovieOrSerie === 'movie' ? 'Film' : 'Série'}`}
                {' - '}
                {`${!movieDate ? null : movieDate.split('-')[0]}`}
                {' - '}
                { isMovieOrSerie === 'movie'
                  ? `${movieDetails.runtime} min`
                  : `${movieDetails.number_of_seasons} saisons`
                }
              </Typography>
              <Typography
                component='p'
                align='center'
                color='gray'
                fontFamily='League Spartan, sans-serif'
                fontSize='0.9em'
                fontWeight='300'
                lineHeight='1'
                marginTop='15px'
              >
                {`${movieDetails.genres.map((genre) => genre.name).join(', ')}`}
              </Typography>
            </>
          }
        </Stack>
        {
          areDetailsLoading ?
          <Skeleton variant='text' animation='wave' sx={{ fontSize: '1em', width: '75%' }} />
          :
          <Stack width='90%'>
            {
              movieDetails.tagline && movieDetails.tagline.trim() !== "" ?
                <Typography
                  component='h2'
                  align='center'
                  color={theme.palette.text.secondary}
                  fontFamily='League Spartan, sans-serif'
                  fontSize='1.05em'
                  fontWeight='300'
                  fontStyle='italic'
                  lineHeight='1.2'
                >
                  {`${movieDetails.tagline}`}
                </Typography>
              :
                <Divider 
                  sx={{
                    width: '15%',
                    borderColor: '#aa9a709c',
                    margin: '0 auto !important'
                  }}
                />
            }           
          </Stack>      
        }
        <FilmRating isMovieOrSerie={isMovieOrSerie} movie={movie} />
      </Stack>
    </Container>
  );
};

export default FilmPresentation;