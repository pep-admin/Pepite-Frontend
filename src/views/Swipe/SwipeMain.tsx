// Import des libs externes
import { useState, useEffect, useRef } from 'react';
import {
  styled,
  Stack,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  Badge,
  Rating,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import StarIcon from '@mui/icons-material/Star';

// Badge rectangulaire customisé "déjà vu ?"
const StyledBadge = styled(Badge)(() => ({
  '.MuiBadge-standard': {
    top: '28px',
    right: '-10px',
    borderRadius: 0,
    height: '27px',
  },
  '.MuiBadge-anchorOriginTopRightRectangle': {
    top: '28px',
    right: '-10px',
    borderRadius: 0,
    height: '27px',
  },
}));

// Etoiles customisées jaune
const YellowRating = styled(Rating)({
  '.MuiRating-iconFilled': {
    color: '#FFDA1B',
  },
});

// Etoiles customisées jaune
const OrangeRating = styled(Rating)({
  '.MuiRating-iconFilled': {
    color: '#F29E50',
  },
});

// Etoiles customisées turquoise
const TurquoiseRating = styled(Rating)({
  '.MuiRating-iconFilled': {
    color: '#24A5A5',
  },
});

const SwipeMain = ({ Item }) => {
  // Movie Id pour récupérer les infos détaillées du film affiché
  const [movieId, setMovieId] = useState(null);

  // 20 films pour laisser une marge de swipe et film détaillé
  const [movies, setMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);

  // Index permettant de swiper
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const [posterWidth, setPosterWidth] = useState(null);

  // Gestion du chargement et erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Image du film affiché
  const posterRef = useRef<HTMLImageElement | null>(null);

  // Récupère 20 films pour laisser une marge de swipe et limiter les requêtes
  useEffect(() => {
    async function fetchTwentyMovies() {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/movies/all`,
        );
        setMovies(response.data.results);
      } catch (err) {
        setError('Erreur lors de la récupération des détails du film.');
      } finally {
        setLoading(false);
      }
    }
    fetchTwentyMovies();
  }, []);

  // Récupère les informations détaillées d'un film
  useEffect(() => {
    if (movieId === null) return;
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/movies/details/${movieId}`,
        );
        console.log(response.data);

        setMovieDetail([
          `Type : Film`,
          `Genre : ${response.data.genres[0].name}`,
          `Pays : ${response.data.production_countries[0].iso_3166_1}`,
          `Année : ${response.data.release_date}`,
          `Réalisation : ${response.data.production_countries[0].iso_3166_1}`,
          `Acteurs : ${response.data.production_countries[0].iso_3166_1}`,
        ]);
      } catch (err) {
        setError('Erreur lors de la récupération des détails du film.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  // Récupère l'id du film affiché
  useEffect(() => {
    if (movies.length > 0 && movies[currentMovieIndex].id !== null) {
      const currentMovieId = movies[currentMovieIndex].id;
      setMovieId(currentMovieId);
    }
  }, [movies, currentMovieIndex]);

  useEffect(() => {
    console.log('film affiché', movies[currentMovieIndex]);
  }, [movies, currentMovieIndex]);

  useEffect(() => {
    console.log('id du film', movieId);
  }, [movieId]);

  const handleSwipe = direction => {
    if (direction === 'left') {
      // ... logic for left swipe
    } else if (direction === 'right') {
      // ... logic for right swipe
    }
    setCurrentMovieIndex(prevIndex => prevIndex + 1);
  };

  // Détecte la largeur dynamique de l'image pour pouvoir l'assigner à la div qui contient les notes
  useEffect(() => {
    if (posterRef.current) {
      const posterWidth = posterRef.current.clientWidth;
      setPosterWidth(posterWidth);
    }
  }, [movieDetail, currentMovieIndex]);

  return (
    <Item customheight="100%">
      <Stack
        direction="row"
        sx={{
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #EBEBEB',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: '#0E6666',
            fontSize: '1.2em',
            fontWeight: 'bold',
          }}
        >
          {movies.length > 0 ? movies[currentMovieIndex].title : null}
        </Typography>
      </Stack>
      <Box padding="10px 0" height="calc(100% - 35px)">
        {movies[currentMovieIndex] && (
          <Card
            sx={{
              boxShadow: 'none',
              height: '100%',
            }}
          >
            <Stack
              direction="row"
              sx={{
                height: 'calc(65% - 16.5px)',
                justifyContent: 'space-around',
              }}
            >
              <Box
                sx={{
                  width: '65px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SwipeLeftIcon
                  color="error"
                  sx={{
                    height: '1.3em',
                    width: '1.3em',
                    color: '#0E6666',
                  }}
                  onClick={() => handleSwipe('left')}
                />
              </Box>
              <Box
                width="calc(100% - 130px)"
                height="100%"
                display="flex"
                justifyContent="center"
                position="relative"
              >
                <StyledBadge
                  variant="standard"
                  badgeContent={'Déjà vu ?'}
                  color="primary"
                  overlap="rectangular"
                >
                  {movies.length > 0 && movies[currentMovieIndex] ? (
                    <CardMedia
                      ref={posterRef}
                      component="img"
                      alt={movies[currentMovieIndex].title}
                      image={`https://image.tmdb.org/t/p/w500/${movies[currentMovieIndex].poster_path}`}
                      sx={{
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : null}
                </StyledBadge>
                <Stack
                  position="absolute"
                  bottom="0"
                  left="50%"
                  height="fit-content"
                  width={posterWidth}
                  sx={{
                    padding: '6px 6px 0 15px',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <YellowRating
                      name="half-rating-read"
                      size="small"
                      value={2.5}
                      precision={0.25}
                      readOnly
                      emptyIcon={
                        <StarIcon
                          sx={{ color: '#E1E1E1' }}
                          fontSize="inherit"
                        />
                      }
                      sx={{ marginRight: '5px' }}
                    />
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: '#FFDA1B',
                        fontWeight: 'bold',
                        position: 'relative',
                        top: 0.5,
                      }}
                    >
                      {'2.5' + '/5'}
                    </Typography>
                    <Box
                      minWidth="170px"
                      position="relative"
                      bottom="5px"
                      textAlign="left"
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#fefefe', minWidth: '170px' }}
                      >
                        {'Note générale'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <OrangeRating
                      name="half-rating-read"
                      size="small"
                      value={2.5}
                      precision={0.25}
                      readOnly
                      emptyIcon={
                        <StarIcon
                          sx={{ color: '#E1E1E1' }}
                          fontSize="inherit"
                        />
                      }
                      sx={{ marginRight: '5px' }}
                    />
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: '#F29E50',
                        fontWeight: 'bold',
                        position: 'relative',
                        top: 0.5,
                      }}
                    >
                      {'2.5' + '/5'}
                    </Typography>
                    <Box
                      minWidth="170px"
                      position="relative"
                      bottom="5px"
                      textAlign="left"
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#F29E50', fontWeight: 'bold' }}
                      >
                        {'2 amis'}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#fefefe' }}
                      >
                        {' ont noté ce film'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <TurquoiseRating
                      name="half-rating-read"
                      size="small"
                      value={2.5}
                      precision={0.25}
                      readOnly
                      emptyIcon={
                        <StarIcon
                          sx={{ color: '#E1E1E1' }}
                          fontSize="inherit"
                        />
                      }
                      sx={{ marginRight: '5px' }}
                    />
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: '#24A5A5',
                        fontWeight: 'bold',
                        position: 'relative',
                        top: 0.5,
                      }}
                    >
                      {'2.5' + '/5'}
                    </Typography>
                    <Box
                      minWidth="170px"
                      position="relative"
                      bottom="5px"
                      textAlign="left"
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#24A5A5', fontWeight: 'bold' }}
                      >
                        {'3 abonnements'}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#fefefe' }}
                      >
                        {' ont noté ce film'}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: '65px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SwipeRightIcon
                  sx={{
                    height: '1.3em',
                    width: '1.3em',
                    color: '#0E6666',
                  }}
                  onClick={() => handleSwipe('right')}
                />
              </Box>
            </Stack>
            <CardContent
              sx={{ height: 'calc(35% - 16.5px)', padding: '10px 16px' }}
            >
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  height: '100%',
                }}
              >
                <Stack>
                  {movieDetail.length > 0
                    ? movieDetail.map(word => {
                        return (
                          <Typography
                            key={word}
                            align="left"
                            variant="body2"
                            sx={{
                              color: '#0E6666',
                              fontWeight: 'bold',
                            }}
                          >
                            {word}
                          </Typography>
                        );
                      })
                    : null}
                </Stack>
                <Stack sx={{ flex: 1, overflowY: 'scroll' }}>
                  <Typography variant="body2" align="left">
                    {movies[currentMovieIndex].overview}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions
              sx={{ height: '33px', justifyContent: 'center', padding: 0 }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  maxHeight: '33px',
                  padding: '0 15px',
                  fontSize: '0.9em',
                }}
              >
                Je veux le voir !
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>
    </Item>
  );
};

SwipeMain.propTypes = {
  Item: PropTypes.elementType.isRequired,
};

export default SwipeMain;
