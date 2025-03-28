import { Stack, TextField, Typography, useTheme } from '@mui/material';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';

const RatingReview = ({
  ratingSectionIndex,
  movie,
  criticText,
  setCriticText,
  friendSelected,
}) => {
  const theme = useTheme();

  const isMovieOrSerie = findIfMovieOrSerie(movie);
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;
  const friendFullname = `${friendSelected?.first_name} ${friendSelected?.last_name}`;

  // Gestion du changement de texte
  const handleTextChange = event => {
    setCriticText(event.target.value);
  };

  return (
    <Stack padding="30px 0 0 0">
      <Stack direction="row" justifyContent="space-between">
        <Typography
          component="h2"
          color="text.primary"
          fontSize="1.15em"
          fontWeight="400"
          textTransform="uppercase"
        >
          {ratingSectionIndex === 0 ? `VOTRE CRITIQUE` : `VOTRE CONSEIL`}
        </Typography>
        <Typography
          component="span"
          fontSize="1em"
          fontWeight="200"
          color={theme.palette.primary.light}
        >
          {'* facultatif'}
        </Typography>
      </Stack>
      <Stack>
        <TextField
          label={
            ratingSectionIndex === 1 && friendSelected
              ? `Dites quelque chose à ${friendFullname} !`
              : `Qu'avez vous pensé de "${movieTitle}" ?`
          }
          multiline
          rows={5}
          variant="filled"
          value={criticText ? criticText : ''} // Affiche le texte actuel
          onChange={handleTextChange} // Capture les changements de texte
          sx={{
            border: '1px solid #282828',
            marginTop: '19px',
            '& .MuiFilledInput-root': {
              '&:after': {
                borderBottomColor: '#969696', // Couleur du trait lors du focus
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3a3a3a', // Couleur du label lors du focus
            },
            '& .MuiFilledInput-input': {
              fontWeight: 300, // Applique le fontWeight au texte
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default RatingReview;
