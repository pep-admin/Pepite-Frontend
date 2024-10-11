import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { calculateSkeletonCount } from '@utils/functions/calculateSkeletonCount';
import { getMoviesByDirectorRequest} from '@utils/request/film/getMoviesByDirectorRequest';
import { useEffect, useRef, useState } from 'react';
import FilmSimilarCard from './FilmSimilarCard';

const FilmSimilar = ({ isMovieOrSerie, movieDetails }) => {

  const [similarMovies, setSimilarMovies] = useState([]);
  const [areMoviesLoading, setAreMoviesLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  const pageRef = useRef(1);

  const getMoviesByDirector = async () => {
    try {
      setAreMoviesLoading(true);
  
      // Récupération du réalisateur du film 
      const director = movieDetails.crew.find((crew) => crew.job === 'Director' && crew.department === 'Directing');
      if(!director) return;
  
      const directorId = director.id;
  
      const movies = await getMoviesByDirectorRequest(isMovieOrSerie, pageRef.current, directorId, movieDetails.id);
      console.log('films du même réalisateur:', movies);
      
      setSimilarMovies(movies);
      pageRef.current++;
  
    } catch (error) {
      console.log(error);
      
    } finally {
      setAreMoviesLoading(false);
    }
  };   

  useEffect(() => {
    calculateSkeletonCount(80, 0.9, setSkeletonCount); // Calcul initial

    const handleResize = () => {
      calculateSkeletonCount(80, 0.9, setSkeletonCount);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(!movieDetails.crew) return;

    getMoviesByDirector();
  }, [movieDetails]);

  return (
    <Container
      // ref={creditsRef}
      sx={{
        paddingLeft: '5vw',
        paddingRight: '5vw'
      }}
    >
      <Stack
        spacing={3}
        padding='30px 0 40px 0'
      >
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`Du même réalisateur`}
        </Typography>
        <Stack 
          direction='row' 
          spacing={4} 
          sx={{
            overflowX: 'auto',
            overflowY: 'hidden'
          }}
        >
          {areMoviesLoading ? (
            Array.from({ length: skeletonCount }).map((_, index) => (
              <Stack 
                key={index}
                alignItems='center' 
                width='80px'  
                flexShrink={0}  
              >
                <Skeleton variant="circular" animation='wave' width={65} height={65} />
                <Skeleton width="60%" animation='wave' sx={{ margin: '8px auto' }} />
              </Stack>
            ))
          ) : (
            similarMovies.map((movie) => (
              <FilmSimilarCard key={movie.id} isMovieOrSerie={isMovieOrSerie} movie={movie} />
            ))
          )}
        </Stack>
      </Stack>
    </Container>
    
  );
};

export default FilmSimilar;