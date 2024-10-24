import { Stack, Box, Typography, useTheme, Skeleton, Divider, Container } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  
  const theme = useTheme();

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
            {`${movie.title}`}
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
                {`${movie.release_date.split('-')[0]}`}
                {' - '}
                {`${movieDetails.runtime} min`}
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
                  fontSize='1.1em'
                  fontWeight='300'
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