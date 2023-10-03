// Import des libs externes
import { useState, useEffect, useRef } from 'react';
import {
  Stack,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import SwipePoster from './SwipePoster';
import SwipeContent from './SwipeContent';


const SwipeMain = ({ Item }) => {
  // Movie Id pour récupérer les infos détaillées du film affiché
  const [movieId, setMovieId] = useState(null);

  // 20 films pour laisser une marge de swipe et film détaillé
  const [movies, setMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);

  // Index permettant de swiper
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  // Gestion du chargement et erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          { label: 'Type', value: 'Film' },
          { label: 'Genre', value: [response.data.genres[0].name, ', ', response.data.genres[1].name, ', ', response.data.genres[2].name,] },
          { label: 'Pays', value: response.data.production_countries[0].name },
          { label: 'Année', value: response.data.release_date.split('-')[0] },
          { label: 'Réalisation', value: response.data.production_countries[0].iso_3166_1 },
          { label: 'Acteurs', value: response.data.production_countries[0].iso_3166_1 },
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

  const handleSwipe = direction => {
    if (direction === 'left') {
      // ... logic for left swipe
    } else if (direction === 'right') {
      // ... logic for right swipe
    }
    setCurrentMovieIndex(prevIndex => prevIndex + 1);
  };

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
            <SwipePoster 
              handleSwipe={handleSwipe} 
              movies={movies} 
              movieDetail={movieDetail} 
              currentMovieIndex={currentMovieIndex} 
            />
            <CardContent
              sx={{ height: 'calc(35% - 16.5px)', padding: '10px 16px' }}
            >
              <SwipeContent movieDetail={movieDetail} movies={movies} currentMovieIndex={currentMovieIndex} />
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
