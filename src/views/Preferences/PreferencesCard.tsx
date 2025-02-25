import { Grid, Stack, Typography } from '@mui/material';

const PreferencesCard = ({ genre, favoriteGenres, setFavoriteGenres }) => {
  const isSelected = favoriteGenres.includes(genre.id);

  const handleGenreClick = () => {
    setFavoriteGenres(prev => {
      // Si l'id existe déjà, on l'enlève
      if (prev.includes(genre.id)) {
        return prev.filter(id => id !== genre.id);
      }
      // Sinon, on l'ajoute
      return [...prev, genre.id];
    });
  };

  return (
    <Grid item xs={4}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: '100px',
          border: '1px solid #767676',
          background: isSelected
            ? 'rgba(194, 172, 99, 0.70)'
            : 'rgba(113, 113, 113, 0.20)',
          borderRadius: '10px',
        }}
        onClick={handleGenreClick}
      >
        <Typography>{genre.name}</Typography>
      </Stack>
    </Grid>
  );
};

export default PreferencesCard;
