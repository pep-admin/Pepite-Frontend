import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import Header from '@utils/Header';

const Home = () => {
  function generateFilmData(count: number) {
    return Array.from({ length: count }, (_, k) => ({
      id: k + 1,
      title: `Film ${k + 1}`,
      description: `Description du film ${k + 1}`,
      imageUrl: `https://picsum.photos/200/300?random=${k + 1}`,
    }));
  }

  const filmData = generateFilmData(6);

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="body1">{displayBuildDate}</Typography>
        <Stack
          direction={'row'}
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
