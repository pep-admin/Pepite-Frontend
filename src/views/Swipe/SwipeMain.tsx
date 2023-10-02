// Import des libs externes
import { useState, useEffect, useRef } from 'react';
import { styled, Stack, Typography, Box, Card, CardMedia, CardContent, CardActions, Button, Divider, Badge, Rating } from '@mui/material';
import axios from 'axios';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
// import SwipeDownIcon from '@mui/icons-material/SwipeDown';
// import SwipeUpIcon from '@mui/icons-material/SwipeUp';

const StyledBadge = styled(Badge)(() => ({
  '.MuiBadge-standard': {
    top: '28px',
    right: '-10px',
    borderRadius: 0,
    height: '27px'
  },
  '.MuiBadge-anchorOriginTopRightRectangle': {
    top: '28px',
    right: '-10px',
    borderRadius: 0,
    height: '27px'
  },
}));

const SwipeMain = ({ Item }) => {
  const [movieId, setMovieId] = useState(null);

  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const [movie, setMovie] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      let width = imgRef.current.clientWidth;
      // ou 
      let rect = imgRef.current.getBoundingClientRect();
      width = rect.width;
      
      console.log('Element width:', width);
    }
  }, []);

  const [isTruncated, setIsTruncated] = useState(true);

  const truncateText = (inputText, maxLength) => {
    if (inputText.length <= maxLength) return inputText;
    return inputText.substring(0, maxLength) + '...';
  };

  useEffect(() => {

    async function fetchTwentyMovies() {
      try {
          const response = await axios.get(`http://localhost:8800/api/movies/all`);          
          setMovies(response.data.results);
      } catch (err) {
          setError("Erreur lors de la récupération des détails du film.");
      } finally {
          setLoading(false);
      }
    }

    fetchTwentyMovies();
  }, []);

  useEffect(() => {

    if(movieId === null) return;

    async function fetchMovieDetails() {
      try {
          const response = await axios.get(`http://localhost:8800/api/movies/details/${movieId}`);
          setMovie(response.data);
      } catch (err) {
          setError("Erreur lors de la récupération des détails du film.");
      } finally {
          setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    console.log('film affiché', movies[currentMovieIndex]);        
  }, [movies])

  useEffect(() => {
    console.log('id du film', movieId);
  }, [movieId])

  useEffect(() => {
    if(movie === null) return;

    // Liste de titres de précision de films
    setMovieDetail(
      [
        `Type : Film`,
        `Genre : ${movie.genres[0].name}`, 
        `Pays : ${movie.production_countries[0].iso_3166_1}`,
        `Année : ${movie.production_countries[0].release_date}`,
        `Réalisation : ${movie.production_countries[0].iso_3166_1}`,
        `Acteurs : ${movie.production_countries[0].iso_3166_1}` 
      ]
    );
    console.log('film détaillé', movie);        
  }, [movie])

  useEffect(() => {
    if (movies.length > 0 && movies[currentMovieIndex].id !== null) {
        const currentMovieId = movies[currentMovieIndex].id;
        setMovieId(currentMovieId);
    }
  }, [movies, currentMovieIndex]);

  const handleSwipe = (direction) => {
    if (direction === "left") {
      // ... logic for left swipe
    } else if (direction === "right") {
      // ... logic for right swipe
    }
    setCurrentMovieIndex((prevIndex) => prevIndex + 1);
  };


  if(movies.length > 0 && movieDetail !== null) {
    return (
      <Item customheight='100%'>
        <Stack direction='row' sx={{
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #EBEBEB',
        }}>
          <Typography 
            variant='h2' 
            sx={{ 
              color: '#0E6666', 
              fontSize: '1.2em', 
              fontWeight: 'bold', 
              }}
            >
            {movies[currentMovieIndex].title}
          </Typography>
        </Stack>
        <Box padding='10px 0' height='calc(100% - 35px)'>
            {movies[currentMovieIndex] && (
              <Card sx={{ 
                boxShadow: 'none', 
                height: '100%' }} 
              >
                <Stack 
                  direction='row' 
                  sx={{
                    height: '55%',
                    justifyContent: 'space-around',
                  }}
                >
                  <Box sx={{ 
                    width: '65px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                  >
                    <SwipeLeftIcon 
                      color='error'
                      sx={{
                        height: '1.3em',
                        width: '1.3em',
                        color: '#0E6666',
                      }} 
                      onClick={() => handleSwipe("left")}
                    />
                  </Box>
                  <Box width='calc(100% - 130px)' height='100%' display='flex' justifyContent='center' position='relative'>
                    <StyledBadge variant='standard' badgeContent={'Déjà vu ?'} color="primary" overlap='rectangular'>
                      <CardMedia
                      ref={imgRef}
                        component="img"
                        alt={movies[currentMovieIndex].title}
                        image={`https://image.tmdb.org/t/p/w500/${movies[currentMovieIndex].poster_path}`}
                        sx={{ 
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </StyledBadge>  
                    <Box position='absolute' bottom='0' left='0'>
                      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    </Box>            
                  </Box>
                  <Box sx={{ 
                    width: '65px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                  >
                    <SwipeRightIcon 
                      sx={{
                        height: '1.3em',
                        width: '1.3em',
                        color: '#0E6666'
                      }} 
                      onClick={() => handleSwipe("right")}
                    />
                  </Box>
                </Stack>   
                <CardContent sx={{ height: '35%', paddingBottom: '16px' }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    sx={{
                      height: '100%',
                      flex: 1
                    }}
                  >
                    <Stack>
                      {movieDetail.map((word) => {
                        return(
                          <Typography 
                            key={word} 
                            align='left' 
                            variant='body2'
                            sx={{ 
                              color: '#0E6666',
                              fontWeight: 'bold'
                            }}
                          >
                            {word}
                            
                          </Typography>
                        )
                      })}
                    </Stack>
                    <Stack sx={{ flex: 1 }}>
                      <Typography 
                        variant='body2' 
                        align='left' 
                      >
                        {isTruncated ? truncateText(movies[currentMovieIndex].overview, 200) : movies[currentMovieIndex].overview}
                      </Typography>
                      {isTruncated ? 
                        <Button>
                          {'Voir plus'}
                        </Button>
                        : null
                      }
                    </Stack>
                    
                  </Stack>
                </CardContent>
                <CardActions sx={{ height: '10%', justifyContent: 'center', padding: 0 }}>
                  <Button 
                    variant='contained' 
                    color='success' 
                    sx={{ 
                      height: '100%', 
                      maxHeight: '33px',
                      padding: '0 15px',
                      fontSize: '0.9em'
                    }}>
                      Je veux le voir !
                  </Button>
                </CardActions> 
              </Card>
            )}
        </Box>
      </Item>
    );
  } else {
    return null;
  }
  
};

export default SwipeMain;