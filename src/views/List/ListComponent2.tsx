import { Box, Container, Stack } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { useEffect, useRef, useState } from 'react';
import ListNav from './ListNav';
import { getMoviesListRequest } from '@utils/request/list/getMoviesListRequest';
import { getCriticsOfUserRequest } from '@utils/request/critics/getCriticsOfUserRequest';
import MovieMainCard from '@utils/components/Cards/MovieMainCard';

const ListComponent2 = () => {

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const [moviesList, setMoviesList] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  const [listSectionIndex, setListSectionIndex] = useState(0);

  const scrollableContainerRef = useRef(null);

  const getMoviesList = async(listType: string) => {
    try {
      setLoadingMovies(true);

      let movies = [];

      if(listType === 'rated') {
        movies = await getCriticsOfUserRequest('movie', loggedUserInfos.id);
      } else {
        movies = await getMoviesListRequest(listType, 'movie');
      }

      setMoviesList(movies);
      console.log(movies);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMovies(false);
    }
  };

  useEffect(() => {
    if(listSectionIndex === 0) {
      getMoviesList('wanted');
    } else if(listSectionIndex === 1) {
      getMoviesList('watched');
    } else {
      getMoviesList('rated');
    }
  }, [listSectionIndex]);

  return (
    <>
      <Header2 page={'Ma liste'} isTrailerFullscreen={null} />
      <Box paddingTop='5px' sx={{ backgroundColor: '#052525' }}>
        <ListNav
          listSectionIndex={listSectionIndex}
          setListSectionIndex={setListSectionIndex}
        />
      </Box>
      <Container
        id="scrollableContainer"
        ref={scrollableContainerRef}
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '18px 5vw',
          margin: '0',
          backgroundColor: '#011212',
          height: 'calc(100vh - 109px)',
          overflow: 'auto',
        }}
      >
        <Stack spacing={3} >
        {
          !loadingMovies ?
            moviesList.map((movie, index) => {
              return (
                <MovieMainCard 
                  key={movie.id}
                  listSectionIndex={listSectionIndex}
                  displayGradient={true}
                  movie={movie}
                  isFirstCard={index === 0}
                  isLastCard={index === moviesList.length - 1}
                  onComplete={getMoviesList}
                />
              )
            })
            :
            'Chargement...'
        }
        </Stack>
      </Container>
    </>
  );
};

export default ListComponent2;