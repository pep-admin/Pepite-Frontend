import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { convertDate } from '@utils/functions/convertDate';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';

const MovieSearchCard = ({ movie }) => {

  const isMovieOrSerie = findIfMovieOrSerie(movie);

  const theme = useTheme();

  return (
    <Stack
      spacing={1}
      alignItems='center'
      width='100px'
    >
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
      <Typography
        maxWidth='100%'
        whiteSpace='nowrap'
        overflow='hidden'
        textOverflow='ellipsis'
      >
        {`${ isMovieOrSerie === 'movie' ? movie.title : movie.name }`}
      </Typography>
      <Typography
        color='gray'
      >
        {`${ isMovieOrSerie === 'movie' ? convertDate('year', movie.release_date) : convertDate('year', movie.first_air_date) }`}
      </Typography>
      <Typography
        color={theme.palette.secondary.light}
      >
        {`${isMovieOrSerie === 'movie' ? 'Film' : 'série'}`}
      </Typography>
    </Stack>
    
  );
};

export default MovieSearchCard;