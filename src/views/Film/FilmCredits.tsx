import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { getMovieCreditsRequest } from '@utils/request/film/getMovieCreditsRequest';
import { useEffect, useRef, useState } from 'react';
import { Credits } from 'types/interface';
import FilmCastingCard from './FilmCastingCard';

const FilmCredits = ({ isMovieOrSerie, movie }) => {

  const [movieCredits, setMovieCredits] = useState<Credits>({});
  const [areCreditsLoading, setAreCreditsLoading] = useState(true);
  const [creditsVisible, setCreditsVisible] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(0);

  const creditsRef = useRef(null);

  const getMovieCredits = async () => {
    try {
      setAreCreditsLoading(true);
      const credits = await getMovieCreditsRequest(isMovieOrSerie, movie.id);
      
      // Trier l'équipe technique dans l'ordre d'importance
      const sortedCrew = credits.crew.sort((a, b) => {
        const jobOrder = ['Director', 'Co-Director', 'Producer', 'Co-Producer', 'Writer', 'Story', 'Screenplay', 'Composer', 'Executive Producer'];
        const aIndex = jobOrder.indexOf(a.job) !== -1 ? jobOrder.indexOf(a.job) : jobOrder.length;
        const bIndex = jobOrder.indexOf(b.job) !== -1 ? jobOrder.indexOf(b.job) : jobOrder.length;
        return aIndex - bIndex;
      });

      // Trier les acteurs par popularité
      const sortedCast = credits.cast.sort((a, b) => b.popularity - a.popularity);

      setMovieCredits({
        ...credits,
        crew: sortedCrew, // Utiliser le tableau filtré et trié
        cast: sortedCast,
      });
    } catch (error) {
      console.log('erreur');
    } finally {
      setAreCreditsLoading(false);
    }
  };

  // Détecte le scroll au niveau des crédits du film pour récupérer les données seulement si l'utilisateur scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('visible !');
          setCreditsVisible(true);
          observer.disconnect(); // Déconnecte une fois visible
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
  
    const currentRef = creditsRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

   // Détermine le nombre de skeletons en fonction de la largeur de l'écran
   const calculateSkeletonCount = () => {
    const cardWidth = 80; // Largeur approximative d'une card
    const availableWidth = window.innerWidth * 0.9; // Marge de 10vw pour le padding
    setSkeletonCount(Math.floor(availableWidth / cardWidth));
  };

  useEffect(() => {
    calculateSkeletonCount(); // Calcul initial

    const handleResize = () => {
      calculateSkeletonCount();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(creditsVisible) {
      getMovieCredits();
    }
  }, [creditsVisible]);

  useEffect(() => {
    console.log('les crédits :', movieCredits);
    
  }, [movieCredits])

  return (
    <Container
      ref={creditsRef}
      sx={{
        paddingLeft: '5vw',
        paddingRight: '5vw'
      }}
    >
      <Stack
        spacing={2}
        padding='20px 0 0 0'
      >
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.3em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`ÉQUIPE TECHNIQUE`}
        </Typography>
        <Stack direction='row' spacing={4} overflow='auto'>
        {areCreditsLoading ? (
          Array.from({ length: skeletonCount }).map(() => (
            <Stack 
              alignItems='center' 
              width='80px'  
              flexShrink={0}  
            >
              <Skeleton variant="circular" animation='wave' width={65} height={65} />
              <Skeleton width="60%" animation='wave' sx={{ margin: '8px auto' }} />
            </Stack>
          ))
          ) : (
            movieCredits.crew.map((crew) => (
              <FilmCastingCard key={crew.id} peopleType={'crew'} people={crew} />
            ))
          )
        }
        </Stack>
      </Stack>
      <Stack
        spacing={2}
        padding='20px 0 40px 0'
      >
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.3em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {`ACTEURS`}
        </Typography>
        <Stack direction='row' spacing={4} overflow='auto'>
          {areCreditsLoading ? (
            Array.from({ length: skeletonCount }).map(() => (
              <Stack 
                alignItems='center' 
                width='80px'  
                flexShrink={0}  
              >
                <Skeleton variant="circular" animation='wave' width={65} height={65} />
                <Skeleton width="60%" animation='wave' sx={{ margin: '8px auto' }} />
              </Stack>
            ))
          ) : (
            movieCredits.cast.map((cast) => (
              <FilmCastingCard key={cast.id} peopleType={'cast'} people={cast} />
            ))
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default FilmCredits;