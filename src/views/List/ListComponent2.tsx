import { Box, Container, Stack } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { useEffect, useRef, useState } from 'react';
import ListNav from './ListNav';
import { getMoviesListRequest } from '@utils/request/list/getMoviesListRequest';
import { getCriticsOfUserRequest } from '@utils/request/critics/getCriticsOfUserRequest';
import MovieMainCard from '@utils/components/Cards/MovieMainCard';
import ListCardSkeleton from './ListCardSkeleton';
import useCardCount from '@hooks/useCardCount';
import useFetchWithMinDelay from '@hooks/useFetchWithMinDelay';

const ListComponent2 = () => {
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const scrollableContainerRef = useRef(null);

  const skeletonCount = useCardCount(scrollableContainerRef, 118.8, 18); // Hauteur de la card skeleton : 118.80px, Espacement : 18px
  const { fetchWithMinDelay, isLoading, error } = useFetchWithMinDelay(1000);

  const [moviesList, setMoviesList] = useState([]);
  const [listSectionIndex, setListSectionIndex] = useState(0);

  const [triggerSkeletons, setTriggerSkeletons] = useState(true); // Afficher les Skeletons au début ou lors d’un changement de section

  const getMoviesList = async (listType: string, showSkeletons = true) => {
    try {
      if (showSkeletons) setTriggerSkeletons(true); // Activer les Skeletons uniquement si nécessaire

      let movies = [];
      if (listType === 'rated') {
        movies = await fetchWithMinDelay(() =>
          getCriticsOfUserRequest('movie', loggedUserInfos.id)
        );
      } else {
        movies = await fetchWithMinDelay(() =>
          getMoviesListRequest(listType, 'movie')
        );
      }

      setMoviesList(movies);
    } catch (err) {
      console.error(err);
    } finally {
      setTriggerSkeletons(false); // Désactiver les Skeletons après le chargement
    }
  };

  // Gestion des changements de section
  useEffect(() => {
    if (listSectionIndex === 0) {
      getMoviesList('wanted', true); // Activer les Skeletons lors des changements de section
    } else if (listSectionIndex === 1) {
      getMoviesList('watched', true);
    } else {
      getMoviesList('rated', true);
    }
  }, [listSectionIndex]);

  return (
    <>
      <Header2 page={'Ma liste'} isTrailerFullscreen={null} />
      <Box paddingTop="5px" sx={{ backgroundColor: '#052525' }}>
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
          padding: '18px 0',
          margin: '0',
          backgroundColor: '#011212',
          height: 'calc(100vh - 109px)',
          overflow: 'auto',
        }}
      >
        <Stack spacing={3}>
          {triggerSkeletons && isLoading ? (
            // Afficher les Skeletons uniquement au premier chargement ou lors des changements de section
            Array.from({ length: skeletonCount }).map((_, index) => (
              <ListCardSkeleton key={index} />
            ))
          ) : moviesList.length > 0 && !isLoading ? (
            moviesList.map((movie, index) => (
              <MovieMainCard
                key={movie.id}
                listSectionIndex={listSectionIndex}
                displayGradient={true}
                movie={movie}
                isFirstCard={index === 0}
                isLastCard={index === moviesList.length - 1}
                onComplete={() => 
                  getMoviesList(listSectionIndex === 0 
                    ? 'wanted' 
                    : listSectionIndex === 1 
                    ? 'watched' 
                    : 'rated'
                    , false)} // Ne pas activer les Skeletons lors des actions des boutons
              />
            ))
          ) : (
            <Box sx={{ color: '#fff', textAlign: 'center', marginTop: '20px' }}>
              Aucun film dans cette liste.
            </Box>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default ListComponent2;
