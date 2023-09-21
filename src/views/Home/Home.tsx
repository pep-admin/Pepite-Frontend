import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';

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
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={'h1'} sx={{ flexGrow: 1 }}>
            {'Pépite'}
          </Typography>
          <Button color="inherit">{'Login'}</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          {filmData.map((film, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={film.imageUrl}
                  alt={film.title}
                />
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    spacing={1}
                  >
                    <Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MovieIcon />
                        <Typography variant="h6" component="h2">
                          {film.title}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {film.description}
                      </Typography>
                    </Stack>
                    <Button variant="outlined" endIcon={<StarIcon />}>
                      {"J'aime"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
