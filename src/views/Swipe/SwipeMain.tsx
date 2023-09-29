// Import des libs externes
import { useState, useEffect } from 'react';
import { Stack, Typography, Box, Card, CardMedia, CardContent, CardActions, Button, Divider } from '@mui/material';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';

const SwipeMain = ({ Item }) => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch("http://localhost:8800/api/movies/all");
      const data = await response.json();
      setMovies(data.results);
    }

    fetchMovies();
  }, []);

  useEffect(() => {
    console.log('film affiché', movies[currentMovieIndex]);    
    
  }, [movies])

  const handleSwipe = (direction) => {
    if (direction === "left") {
      // ... logic for left swipe
    } else if (direction === "right") {
      // ... logic for right swipe
    }
    setCurrentMovieIndex((prevIndex) => prevIndex + 1);
  };

  if(movies.length !== 0) {
    return (
      <Item>
        <Stack>
          <Typography variant='h2' p={ '3%'} sx={{ color: '#0E6666', fontSize: '1.2em', fontWeight: 'bold', borderBottom: '1px solid #EBEBEB' }}>
            {movies[currentMovieIndex].title}
          </Typography>
        </Stack>
        <Box padding='10px 0'>
            {movies[currentMovieIndex] && (
              <Card sx={{ boxShadow: 'none' }} >
                <Stack direction='row'>
                  <Box sx={{ 
                    width: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                  >
                    <SwipeLeftIcon 
                      sx={{
                        color: '#0E6666',
                      }} 
                      onClick={() => handleSwipe("left")}
                    />
                  </Box>
                  
                  <CardMedia
                    component="img"
                    alt={movies[currentMovieIndex].title}
                    image={`https://image.tmdb.org/t/p/w500/${movies[currentMovieIndex].poster_path}`}
                    sx={{
                      width: 'calc(100% - 100px)'
                    }}
                  />
                  <Box sx={{ 
                    width: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                  >
                    <SwipeRightIcon 
                      sx={{
                        color: '#0E6666'
                      }} 
                      onClick={() => handleSwipe("right")}
                    />
                  </Box>
                </Stack>   
                <CardContent>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Stack>
                      <Typography variant='body2'>
                        {'Type'}
                      </Typography>
                      <Typography variant='body2'>
                        {'Genre'}
                      </Typography>
                      <Typography variant='body2'>
                        {'Année'}
                      </Typography>
                      <Typography variant='body2'>
                        {'Pays'}
                      </Typography>
                      <Typography variant='body2'>
                        {'Réalisation'}
                      </Typography>
                      <Typography variant='body2'>
                        {'Acteurs'}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant='body2'>
                        {movies[currentMovieIndex].overview}
                      </Typography>
                    </Stack>
                    
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
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