import { Box, Container, SwipeableDrawer } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import HomeNav from './HomeNav';
import HomeSection from './HomeSection';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPopularMoviesRequest } from '@utils/request/home/getPopularMoviesRequest';
import { getFriendsCriticsRequest } from '@utils/request/critics/getFriendsCriticsRequest';
import { getFollowedCriticsRequest } from '@utils/request/critics/getFollowedCriticsRequest';
import { getUpcomingMoviesRequest } from '@utils/request/home/getUpcomingMoviesRequest';
import FilmComponent from '@views/Film/FilmComponent';
import Header2 from '@utils/components/Header/Header2';

const HomeComponent = () => {
  const [homeSectionIndex, setHomeSectionIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState([]); // Films en cours de chargement
  const [hasMore, setHasMore] = useState(true);
  const [showFilmDetails, setShowFilmDetails] = useState({ display: false, movie: null }); 

  const homeSectionRef = useRef('popular');
  const pageRef = useRef(1);
  const scrollableContainerRef = useRef(null);

  const getMovies = async () => {
    // console.log('Fetching movies... La page =>', pageRef.current);
    setLoadingMovies(Array(20).fill({})); // Ajoute 20 films fictifs en tant que placeholders pour le Skeleton

    let movies = [];

    switch (homeSectionRef.current) {
      case 'popular':
        movies = await getPopularMoviesRequest(pageRef.current);
        break;
      case 'friends':
        movies = await getFriendsCriticsRequest(pageRef.current, 'movie');
        break;
      case 'followed':
        movies = await getFollowedCriticsRequest(pageRef.current, 'movie');
        break;
      case 'upcoming':
        movies = await getUpcomingMoviesRequest(pageRef.current);
        break;
      default:
        break;
    }

    if (movies && movies.length > 0) {
      console.log('les films !', movies);

      setMovies(prevMovies => [...prevMovies, ...movies]); // Cumul des films
      pageRef.current++;
    } else {
      setHasMore(false); // S'il n'y a plus de films à charger
    }

    setLoadingMovies([]); // Retirer les placeholders une fois le chargement terminé
  };

  useEffect(() => {
    setMovies([]);
    pageRef.current = 1;

    switch (homeSectionIndex) {
      case 0:
        homeSectionRef.current = 'popular';
        break;
      case 1:
        homeSectionRef.current = 'friends';
        break;
      case 2:
        homeSectionRef.current = 'followed';
        break;
      case 3:
        homeSectionRef.current = 'upcoming';
        break;
      default:
        break;
    }

    // Remonter le scroll du conteneur en haut
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({ top: 0 });
    }

    getMovies();
  }, [homeSectionIndex]);

  return (
    <>
      <Header2 page={'Accueil'} isTrailerFullscreen={null} />
      <Box paddingTop='5px' sx={{ backgroundColor: '#052525' }}>
        <HomeNav
          homeSectionIndex={homeSectionIndex}
          setHomeSectionIndex={setHomeSectionIndex}
        />
      </Box>
      <Container
        id="scrollableContainer"
        ref={scrollableContainerRef}
        maxWidth="xl"
        sx={{
          padding: '0 !important',
          margin: '0',
          backgroundColor: '#011212',
          height: 'calc(100vh - 109px)',
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={movies.length}
          next={getMovies}
          hasMore={hasMore}
          loader={false}
          scrollableTarget="scrollableContainer"
        >
          <HomeSection
            homeSectionRef={homeSectionRef}
            movies={[...movies, ...loadingMovies]}
            setShowFilmDetails={setShowFilmDetails}
          />
        </InfiniteScroll>
        <SwipeableDrawer
          anchor={'left'}
          open={showFilmDetails.display}
          onClose={() => setShowFilmDetails({ display: false, movie: null })}
          onOpen={() => setShowFilmDetails({ display: false, movie: showFilmDetails.movie })}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100vw', 
              backgroundColor: '#011212'
            }
          }}
        >
          <FilmComponent 
            movie={showFilmDetails.movie} 
            onClose={() => setShowFilmDetails({ display: false, movie: null })}  
          />
        </SwipeableDrawer>
      </Container>
    </>
  );
};

export default HomeComponent;
