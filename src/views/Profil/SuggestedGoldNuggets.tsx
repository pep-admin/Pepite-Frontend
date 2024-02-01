// Import des libs externes
import React, { useEffect, useRef, useState } from 'react';
import { Stack, Typography, Divider, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des requêtes
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { getGoldNuggetsFromAcquaintances } from '@utils/request/goldNugget/getGoldNuggetsFromAcquaintances';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants internes
import CriticAdvicesModal from '@views/CriticAdvices/CriticAdvicesModal';
import ProfilNoGold from '@views/Profil/ProfilNoGold';
import SuggestedGoldNuggetsCards from '@views/Profil/SuggestedGoldNuggetsCards';

// Import des hooks personnalisés
import { useCardsToShow } from '@hooks/useCardsToShow';
import { useHorizontalScroll } from '@hooks/useHorizontalScroll';

const SuggestedGoldNuggets = ({
  page,
  // userCritics,
  goldenMovies,
  setGoldenMovies,
  loggedUserInfos,
  chosenUser,
}) => {
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

  const { displayType } = useData();
  const { id } = useParams();

  /* 
    Récupère les pépites de l'utilisateur pour la page de profil
  OU
    Récupère les pépites des amis et suivis pour la page d'accueil et page de listes de films
  */
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
      {showGoldenMovie ? (
        <CriticAdvicesModal
          page={page}
          showPoster={showGoldenMovie}
          setShowPoster={setShowGoldenMovie}
          infos={goldenMovieInfos}
          loggedUserInfos={loggedUserInfos} // Les infos de l'utilisateur connecté
          chosenUser={chosenUser} // Les infos de l'utilisateur visité
          from={'suggested'}
        />
      ) : null}
      <Stack direction="column" height="100%">
        <Stack
          direction="row"
          height="25px"
          justifyContent="space-between"
          alignItems="center"
          padding="0 10px"
        >
          <Typography variant="body2" component="p" fontWeight={600}>
            {page === 'profil'
              ? 'Vos dernières pépites'
              : 'Dernières pépites de vos contacts'}
          </Typography>
          <Typography variant="body2" component="p" fontWeight="bold">
            {'Voir +'}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          ref={scrollContainerRef}
          direction="row"
          height={page === 'profil' ? 'calc(100% - 25.8px)' : '150px'}
          justifyContent="flex-start"
          padding={!goldenMovies.length ? '6px' : '6px 6px 0 6px'}
          columnGap={page === 'profil' ? '10px' : '6px'}
          sx={{
            overflowX: 'scroll',
          }}
        >
          {goldenMovies.length > 0 &&
            goldenMovies.map((movie, index) => {
              if (displayType === 'movie' && !movie.movie_id) return null;
              if (displayType === 'tv' && !movie.serie_id) return null;

              return (
                <SuggestedGoldNuggetsCards
                  key={
                    displayType === 'movie'
                      ? `movie-${movie.movie_id}`
                      : `serie-${movie.serie_id}`
                  }
                  page={page}
                  movie={movie}
                  isLast={goldenMovies.length - 1 === index ? true : false}
                  setGoldenMovieInfos={setGoldenMovieInfos}
                  setShowGoldenMovie={setShowGoldenMovie}
                />
              );
            })}
          {(isFetching || areGoldNuggetsLoading) &&
            [...Array(cardsToShow)].map((_, i) => (
              <Stack key={i} height="144px" alignItems="center">
                <Skeleton
                  variant="rounded"
                  width={95}
                  height={121}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={70}
                  height={23}
                  animation="wave"
                />
              </Stack>
            ))}
          {!goldenMovies.length && !areGoldNuggetsLoading && (
            <ProfilNoGold
              page={page}
              loggedUserInfos={loggedUserInfos}
              chosenUser={chosenUser}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};

SuggestedGoldNuggets.propTypes = {
  goldenMovies: PropTypes.array.isRequired,
  setGoldenMovies: PropTypes.func.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  page: PropTypes.string.isRequired,
  // userCritics: PropTypes.array.isRequired,
};

export default React.memo(SuggestedGoldNuggets);
