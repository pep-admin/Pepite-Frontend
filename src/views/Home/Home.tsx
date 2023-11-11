import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Stack, Typography } from '@mui/material';

const Home = () => {
  const buildDate = new Date(BUILD_TIMESTAMP);

  // Formatage de la date en français
  const formattedBuildDate = buildDate
    .toLocaleString('fr-FR', {
      weekday: 'long', // 'long' pour le format complet du jour de la semaine
      year: 'numeric', // 'numeric' pour l'année
      month: 'short', // 'short' pour le format abrégé du mois
      day: 'numeric', // 'numeric' pour le jour du mois
      hour: '2-digit', // '2-digit' pour l'heure
      minute: '2-digit', // '2-digit' pour les minutes
      second: '2-digit', // '2-digit' pour les secondes
      hour12: false, // Utiliser le format 24h
    })
    .replace(/,/g, ''); // Supprimer les virgules du résultat
  const displayBuildDate = formattedBuildDate.replace(' ', ' à ');

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="body1">{displayBuildDate}</Typography>
        <Stack
          direction="row"
          justifyContent={'center'}
          alignItems={'center'}
          width={'100%'}
        >
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/swipe">
            Swipe
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Home;
