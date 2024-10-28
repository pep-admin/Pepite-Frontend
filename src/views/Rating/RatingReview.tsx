import { Stack, TextField, Typography } from "@mui/material"
import { findIfMovieOrSerie } from "@utils/functions/findIfMovieOrSerie";

const RatingReview = ({ movie, criticText, setCriticText }) => {

  const isMovieOrSerie = findIfMovieOrSerie(movie);
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;

  return (
    <Stack
      spacing={5}
      padding='0 0 40px 0'
    >
      <Stack>
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`VOTRE CRITIQUE`}
        </Typography>
        <Typography
          component='h2'
          color='gray'
          fontSize='1em'
          fontWeight='400'
          lineHeight='1'
          marginTop='4px'
        >
          {'Facultatif'}
        </Typography>
      </Stack>
      <Stack>
        <TextField
          label={`Qu'avez vous pensé de "${movieTitle}" ?`}
          multiline
          rows={5}
          variant="filled"
          sx={{
            border: '1px solid #282828',
            '& .MuiFilledInput-root': {
              '&:after': {
                borderBottomColor: '#969696', // Couleur du trait lors du focus
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3a3a3a', // Couleur du label lors du focus
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default RatingReview;