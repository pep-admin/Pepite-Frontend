import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { calculateSkeletonCount } from '@utils/functions/calculateSkeletonCount';
import { getMoviesByDirectorRequest} from '@utils/request/film/getMoviesByDirectorRequest';
import { useEffect, useRef, useState } from 'react';
import FilmSimilarCard from './FilmSimilarCard';
import { findIfMovieOrSerie } from '@utils/functions/findIfMovieOrSerie';

const FilmSimilar = ({ isMovieOrSerie, movieId, directorData }) => {

  const [similarMovies, setSimilarMovies] = useState([]);
  const [areMoviesLoading, setAreMoviesLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  const pageRef = useRef(1);

  const getMoviesByDirector = async () => {
    try {
      setAreMoviesLoading(true);
  
      const movies = await getMoviesByDirectorRequest(isMovieOrSerie, pageRef.current, directorData.id, movieId);
      console.log(`${isMovieOrSerie} du même réalisateur: `, movies);
      
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
    if(!directorData.id) return;

    getMoviesByDirector();
  }, [!directorData.id]);

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
        padding='30px 0 0 0'
      >
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`Lié à ${directorData.name}`}
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
                flexShrink={0}  
              >
                <Skeleton variant='rectangular' animation='wave' width={100} height={150} />
                <Skeleton variant='text' width='60%' animation='wave' sx={{ fontSize: '0.9em', margin: '10px auto' }} />
              </Stack>
            ))
          ) : (
            similarMovies.map((movie) => (
              <FilmSimilarCard key={movie.id} movie={movie} />
            ))
          )}
        </Stack>
      </Stack>
    </Container>
    
  );
};

export default FilmSimilar;