import { Box, Stack, Typography } from '@mui/material';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';
import { useNavigate } from 'react-router-dom';

const FilmSimilarCard = ({ movie, onNavigate }) => {

  const navigate = useNavigate();

  const isMovieOrSerie = findIfMovieOrSerie(movie);  

  return (
    <Stack
      alignItems='center'
    >
      <Box 
        sx={{
          width: '100px',
          aspectRatio: '2/3',
          background: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          outline: '1px solid #1F1F1F'
        }}
        onClick={() => onNavigate(isMovieOrSerie, movie.id)}
      />
      <Typography
        align='center'
        fontFamily='Pragati Narrow, sans-serif'
        fontSize='0.9em'
        lineHeight='1.3'
        marginTop='10px'
      >
        {
          isMovieOrSerie === 'movie' ?
            movie.title
          :
            movie.name
        }
      </Typography>
    </Stack>
  );
};

export default FilmSimilarCard;