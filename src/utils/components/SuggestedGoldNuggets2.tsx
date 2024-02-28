// Import des libs externes
import { Skeleton, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import SuggestedGoldNuggetsCards2 from './SuggestedGoldNuggetsCards2';
import CriticAdvicesModal from '@views/CriticAdvices/CriticAdvicesModal';

// Import des hooks personnalisés
import { useData } from '@hooks/DataContext';
import { useCardsToShow } from '@hooks/useCardsToShow';
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';

// Import des requêtes
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { getGoldNuggetsFromAcquaintances } from '@utils/request/goldNugget/getGoldNuggetsFromAcquaintances';

const SuggestedGoldNuggets2 = ({page, loggedUserInfos, goldenMovies, setGoldenMovies}) => {

  const { displayType } = useData();
  const { id } = useParams();

  const [showGoldenMovie, setShowGoldenMovie] = useState(false);
  const [goldenMovieInfos, setGoldenMovieInfos] = useState(null);
  const [areGoldNuggetsLoading, setAreGoldNuggetsLoading] = useState(true);

  const hasMoreDataRef = useRef(true);
  const scrollContainerRef = useRef(null);
  const goldNuggetsPageRef = useRef(1);
  const initialLoadDone = useRef(false);
  const isFirstRender = useRef(true);

   /* Calcule les cards à afficher selon la largeur du viewport.
    width: 95px, gap: 6px, 3 cards en plus pour la marge
  */
  const cardsToShow = useCardsToShow(95, 6, 3);

  const loadGoldNuggets = async () => {
    if (!hasMoreDataRef.current) return;

    setAreGoldNuggetsLoading(true);

    try {
      // Définition de la fonction en fonction de la page
      const fetchData =
        page === 'home' || page === 'list'
          ? () =>
              getGoldNuggetsFromAcquaintances(
                displayType,
                loggedUserInfos.id,
                cardsToShow,
                goldNuggetsPageRef.current,
              )
          : () =>
              getAllGoldNuggetsOfUser(
                displayType,
                id,
                cardsToShow,
                goldNuggetsPageRef.current,
              );

      const { data } = await fetchData();

      setGoldenMovies(prev => [...prev, ...data.goldenMovies]);

      if (!data.hasMore) {
        hasMoreDataRef.current = false;
      }

      goldNuggetsPageRef.current++; // Incrémentation de la page
    } catch (error) {
      console.error('Erreur lors de la récupération des pépites', error);
    } finally {
      setAreGoldNuggetsLoading(false);
    }
  };

   // Hook personnalisé de détection du scroll horizontal
   const [isFetching] = useHorizontalScroll(
    loadGoldNuggets,
    250,
    scrollContainerRef.current,
    hasMoreDataRef.current,
  );

  useEffect(() => {
    // Exécute uniquement si le chargement initial n'a pas encore été fait et si le nombre de cards a été calculé
    if (!initialLoadDone.current && cardsToShow > 0) {
      loadGoldNuggets();
      initialLoadDone.current = true; // Chargement initial terminé
    }
  }, [cardsToShow]);

  // Réinitialisation des pépites si l'utilisateur change le type (film ou série)
  useEffect(() => {
    // Ignore le premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setGoldenMovies([]);
      hasMoreDataRef.current = true;
      goldNuggetsPageRef.current = 1;
      loadGoldNuggets();
    }
  }, [displayType, id]);  

  return (
    <>
      {showGoldenMovie && (
          <CriticAdvicesModal
            page={page}
            showPoster={showGoldenMovie}
            setShowPoster={setShowGoldenMovie}
            infos={goldenMovieInfos}
            loggedUserInfos={loggedUserInfos} // Les infos de l'utilisateur connecté
            // chosenUser={chosenUser} // Les infos de l'utilisateur visité
            from={'suggested'}
          />
        )
      }
      <Stack 
      ref={scrollContainerRef}
        width='calc(100vw - 3%)'
        marginLeft='3%'
        position= 'absolute'
        top='-59px'
        sx={{
          overflowX: 'scroll'
        }}
      >
        <Stack 
          direction='row'
          columnGap='10px'
          paddingLeft='1%'
        >
          { goldenMovies && 
            goldenMovies.map((movie, index) => {
              return(
                <SuggestedGoldNuggetsCards2 
                  key={movie.movie_id}
                  page={page}
                  movie={movie}
                  setGoldenMovieInfos={setGoldenMovieInfos}
                  setShowGoldenMovie={setShowGoldenMovie}
                />
              ) 
            })
          }
          {(isFetching || areGoldNuggetsLoading) &&
            [...Array(cardsToShow)].map((_, i) => (
              <Stack key={i} alignItems="center" marginBottom='9px'>
                <Skeleton
                  variant="rounded"
                  width={90}
                  height={120}
                  animation="wave"
                  sx={{
                    bgcolor: '#6072727a'
                  }}
                />
              </Stack>
            ))}
        </Stack>
      </Stack>   
    </>
    
  );
};

export default SuggestedGoldNuggets2;