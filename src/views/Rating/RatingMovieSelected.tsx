import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { convertDate } from '@utils/functions/convertDate';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';

const RatingMovieSelected = ({ movie }) => {

  const isMovieOrSerie = findIfMovieOrSerie(movie);
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;

  const theme = useTheme();

  return (
    <Stack>
     <Stack spacing={4} direction='row' alignItems='center' >
        <Box
          sx={{
            width: '100px',
            aspectRatio: '2/3',
            background: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            outline: '1px solid #292929'
          }}
        />
        <Stack spacing={1} >
          <Typography
            component='h3'
            fontSize={movieTitle.length >= 10 ? '1em' : '1.1em'}
          >
            {`${movieTitle}`}
          </Typography>
          <Typography
            color='gray'
          >
            {`${ isMovieOrSerie === 'movie' ? convertDate('year', movie.release_date) : convertDate('year', movie.first_air_date) }`}
          </Typography>
          <Typography
            color={theme.palette.secondary.light}
          >
            {`${isMovieOrSerie === 'movie' ? 'Film' : 'Série'}`}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: '#282828', marginTop: '30px' }} />
    </Stack>
  );
};

export default RatingMovieSelected;