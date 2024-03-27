// Import des libs externes
import { Paper, Skeleton, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import SuggestedGoldNuggetsCards from './SuggestedGoldNuggetsCards';
import CriticAdvicesModal from '@views/CriticAdvices/CriticAdvicesModal';

// Import des hooks personnalisés
import { useData } from '@hooks/DataContext';
import { useCardsToShowHorizontal } from '@hooks/useCardsToShowHorizontal';
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';

// Import des requêtes
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { getGoldNuggetsFromAcquaintances } from '@utils/request/goldNugget/getGoldNuggetsFromAcquaintances';

const SuggestedGoldNuggets = ({
  page,
  loggedUserInfos,
  goldenMovies,
  setGoldenMovies,
  chosenUser,
}) => {
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
  const cardsToShow = useCardsToShowHorizontal(95, 6, 3);

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
        console.log('plus aucune pépite à récup');

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

  // Réinitialisation des pépites si on change de profil utilisateur
  useEffect(() => {
    // Ignore le premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log('reinit pépites');

      setGoldenMovies([]);
      hasMoreDataRef.current = true;
      goldNuggetsPageRef.current = 1;
      loadGoldNuggets();
    }
  }, [id]);

  return (
    <>
      {showGoldenMovie && (
        <CriticAdvicesModal
          page={page}
          showPoster={showGoldenMovie}
          setShowPoster={setShowGoldenMovie}
          infos={goldenMovieInfos}
          loggedUserInfos={loggedUserInfos} // Les infos de l'utilisateur connecté
          chosenUser={chosenUser} // Les infos de l'utilisateur visité
          from={'suggested'}
        />
      )}
      <Stack
        ref={scrollContainerRef}
        width="calc(100vw - 3%)"
        marginLeft="3%"
        position="absolute"
        top="-59px"
        sx={{
          overflowX: 'scroll',
        }}
      >
        <Stack direction="row" columnGap="10px" paddingLeft="1%">
          {goldenMovies &&
            goldenMovies.map(movie => {
              return (
                <SuggestedGoldNuggetsCards
                  key={movie.movie_id}
                  movie={movie}
                  setGoldenMovieInfos={setGoldenMovieInfos}
                  setShowGoldenMovie={setShowGoldenMovie}
                />
              );
            })}
          {/* Affichage conditionnel en fonction du chargement des données */}
          {(areGoldNuggetsLoading || isFetching) && hasMoreDataRef.current
            ? // Affichage des Skeletons pendant le chargement
              Array.from({ length: cardsToShow }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={90}
                  height={120}
                  animation="wave"
                  sx={{
                    bgcolor: '#1a999945',
                    flexShrink: '0',
                    marginBottom: '9px',
                  }}
                />
              ))
            : // Affichage des Papers une fois que les données sont chargées
              Array.from({
                length: Math.max(cardsToShow - goldenMovies.length, 0),
              }).map((_, index) => (
                <Paper
                  key={index}
                  sx={{
                    width: 90,
                    height: 120,
                    bgcolor: '#1a999945',
                    flexShrink: '0',
                    marginBottom: '9px',
                    boxShadow:
                      '0px 2px 1px -1px rgb(174 174 174 / 20%), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgb(69 69 69 / 12%)',
                  }}
                />
              ))}
        </Stack>
      </Stack>
    </>
  );
};

SuggestedGoldNuggets.propTypes = {
  page: PropTypes.string.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
  goldenMovies: PropTypes.array.isRequired,
  setGoldenMovies: PropTypes.func.isRequired,
  chosenUser: PropTypes.object,
};

export default SuggestedGoldNuggets;
