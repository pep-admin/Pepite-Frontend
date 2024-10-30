import { Box, Stack, Typography, useTheme } from '@mui/material';
import { convertDate } from '@utils/functions/convertDate';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';
import { getAndStoreMovieDetails } from '@utils/functions/getAndStoreMovieDetails';

const MovieSearchCard = ({ movie, setSearchResults, setMovieSelected }) => {

  const isMovieOrSerie = findIfMovieOrSerie(movie);

  const theme = useTheme();

  const selectMovie = () => {
    setSearchResults([]); // Supprime les résultats de recherche
    setMovieSelected(movie); // Assigne le film sélectionné au film choisi
    getAndStoreMovieDetails(isMovieOrSerie, movie.id, null); // Sauvegarde les détails du film dans la DB
  }

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
        onClick={selectMovie}
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