import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { getMovieCreditsRequest } from '@utils/request/film/getMovieCreditsRequest';
import { useEffect, useRef, useState } from 'react';
import { Credits } from 'types/interface';
import FilmCastingCard from './FilmCastingCard';
import { calculateSkeletonCount } from '@utils/functions/calculateSkeletonCount';

const FilmCredits = ({ isMovieOrSerie, movie }) => {

  const [movieCredits, setMovieCredits] = useState<Credits>({});
  const [areCreditsLoading, setAreCreditsLoading] = useState(true);
  const [creditsVisible, setCreditsVisible] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  const creditsRef = useRef(null);
  const crewRef = useRef(null);
  const castRef = useRef(null);

  const getMovieCredits = async () => {
    try {
      setAreCreditsLoading(true);
      const credits = await getMovieCreditsRequest(isMovieOrSerie, movie.id);

       // Liste des métiers principaux
       const mainJobs = [
        'Director', 'Producer', 'Executive Producer', 'Co-Producer', 'Associate Producer',
        'Writer', 'Story', 'Screenplay', 'Composer', 'Director of Photography', 
        'Editor', 'Production Designer', 'Art Director', 'Costume Designer', 
        'Special Effects', 'Visual Effects Supervisor', 
        'Casting Director', 'Stunt Coordinator'
      ];

      // Filtrer pour ne garder que les métiers principaux
      const filteredCrew = credits.crew.filter(member => mainJobs.includes(member.job));
      
      // Trier l'équipe technique dans l'ordre d'importance
      const sortedCrew = filteredCrew.sort((a, b) => {
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

  useEffect(() => {
    if (!areCreditsLoading) {
      const crewHeight = crewRef.current ? crewRef.current.offsetHeight : 0;
      const castHeight = castRef.current ? castRef.current.offsetHeight : 0;
      setMaxHeight(Math.max(crewHeight, castHeight));
    }
  }, [areCreditsLoading, movieCredits]);

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
      <Stack>
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
            {`ÉQUIPE TECHNIQUE`}
          </Typography>
          <Stack 
            ref={crewRef} 
            direction='row' 
            spacing={4} 
            sx={{ 
              height: maxHeight ? `${maxHeight}px` : 'auto',
              overflowX: 'auto',
              overflowY: 'hidden'
            }}  
          >
          {areCreditsLoading ? (
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
              movieCredits.crew.map((crew) => (
                <FilmCastingCard key={crew.credit_id} peopleType={'crew'} people={crew} />
              ))
            )
          }
          </Stack>
        </Stack>
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
            {`ACTEURS`}
          </Typography>
          <Stack 
            ref={castRef} 
            direction='row' 
            spacing={4} 
            sx={{ 
              height: maxHeight ? `${maxHeight}px` : 'auto',
              overflowX: 'auto',
              overflowY: 'hidden'
            }}    
          >
            {areCreditsLoading ? (
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
              movieCredits.cast.map((cast) => (
                <FilmCastingCard key={cast.credit_id} peopleType={'cast'} people={cast} />
              ))
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FilmCredits;