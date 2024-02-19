// Import des libs externes
import { useState, useEffect, useCallback } from 'react';

// Import des composants internes
import SwipeComponent2 from '@views/Swipe/SwipeComponent2';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des fonctions utilitaires
import {
  findCertificationFr,
  findIsoCountry,
} from '@utils/functions/findInfos';

// Import des requêtes
import { fetchTwentyMovies } from '@utils/request/swipe/getMoviesSwipe';
import { storeDetailsData } from '@utils/request/swipe/storeDetailsData';
import { getMovieDetails } from '@utils/request/getMovieDetails';

const SwipeContainer = () => {
  const [movies, setMovies] = useState([]); // tableau des films / séries pour laisser une marge de swipe
  const [moviesStatusUpdated, setMoviesStatusUpdated] = useState([]);
  const [hasMoreMovies, setHasMoreMovies] = useState(true); // S'il y'a toujours des films à récupérer
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0); // Index du film affiché
  const [movieDetail, setMovieDetail] = useState({}); // Informations détaillées sur le film affiché
  const [nextMovieDetail, setNextMovieDetail] = useState({}); // Informations détaillées sur le film affiché
  const [moviePage, setMoviePage] = useState(1); // Numéro de la page de l'API
  const [swipeAction, setSwipeAction] = useState({direction: null, from: null}); // Gauche ou droite
  const [countryChosen, setCountryChosen] = useState({name: 'États-Unis', code: 'US'});
  // const [isoCountry, setIsoCountry] = useState('US');
  const [genreChosen, setGenreChosen] = useState({ name: null, id: null });
  const [certification, setCertification] = useState({
    imgUrl: null,
    alt: null,
  });
  const [loading, setLoading] = useState({ movies: true, details: true }); // Premier chargement
  const [error, setError] = useState({ message: null, error: null }); // Erreur lors du chargement
  const [isFilterValidated, setFilterValidation] = useState(false);

  const { displayType } = useData();

  // Récupère 20 films selon la page
  const getMovies = useCallback(
    async (moviePage, countryChosen, genreChosen) => {
      try {
        // Minimum d'affichage du Skeleton pendant 2 secondes
        const loadingTimer = new Promise(resolve => setTimeout(resolve, 2000));

        const elligibleMovies = await fetchTwentyMovies(
          moviePage,
          displayType,
          countryChosen,
          genreChosen,
        );

        if (elligibleMovies.length < 20) {
          setHasMoreMovies(false);
        }

        // Ajoute les options à chaque film
        const moviesWithOptions = elligibleMovies.map(movie => ({
          ...movie,
          is_wanted: false,
          is_unwanted: false,
          is_watched: false,
          is_rated: false,
        }));

        setMovies(prevMovies => [...prevMovies, ...moviesWithOptions]);
        setMoviesStatusUpdated(prevMovies => [
          ...prevMovies,
          ...moviesWithOptions,
        ]);

        await Promise.all([elligibleMovies, loadingTimer]);
      } catch (err) {
        setError({
          message: 'Erreur dans la récupération de la page de films.',
          error: err,
        });
      } finally {
        setLoading(prevLoading => ({
          movies: false,
          details: prevLoading.details,
        }));
      }
    },
    [displayType],
  );

  // Récupère les détails d'un film (genre, année...)
  const fetchMovieDetails = async movieId => {
    try {
      const details = await getMovieDetails(displayType, movieId);

      return details;
    } catch (err) {
      console.log(err);
      setError({
        message: 'Erreur dans la récupération des détails du film.',
        error: err,
      });
    }
  };

  // Récupère les détails du film affiché ainsi que les détails du suivant
  const loadMoviesDetails = async () => {
    try {
      if (!movies[currentMovieIndex]) return;

      const nextIndex =
        currentMovieIndex + 1 < movies.length ? currentMovieIndex + 1 : null;
      const movieIdsToFetch = [movies[currentMovieIndex].id];
      if (nextIndex !== null) {
        movieIdsToFetch.push(movies[nextIndex].id);
      }
      console.log('les ids à fetch', movieIdsToFetch);

      // Récupérer les détails pour les deux films simultanément
      const detailsDataArray = await Promise.all(
        movieIdsToFetch.map(id => fetchMovieDetails(id)),
      );

      // Mettre à jour l'état avec les détails du film actuel
      setMovieDetail({
        current: detailsDataArray[0],
        next: detailsDataArray[1],
      });

      // Préchargement du prochain film
      if (detailsDataArray.length > 1 && detailsDataArray[1]) {
        setNextMovieDetail(detailsDataArray[1]);
      }
    } catch (err) {
      console.error(
        'Erreur lors de la récupération des détails des films',
        err,
      );
      setError(err);
    } finally {
      setLoading(prevLoading => ({ ...prevLoading, details: false }));
    }
  };

  useEffect(() => {
    if (movies.length === 0 || currentMovieIndex === -1) return;

    loadMoviesDetails();
  }, [movies, currentMovieIndex]);

  // Si l'utilisateur change de film à série, ou filtre le swipe : RESET
  useEffect(() => {
    setLoading({ movies: true, details: true });
    setMovies([]); // Réinitialisation des données liées aux films/séries
    setMoviePage(1); // Réinitialisation à la page à 1
    setCurrentMovieIndex(0); // Réinitialisation l'index courant à 0
    setSwipeAction({direction: null, from: null});
    getMovies(1, countryChosen, genreChosen.id); // Recharger les films/séries
  }, [isFilterValidated]);

  // Ajoute 20 nouveaux films lorsque l'utilisateur arrive à 3 films avant la fin du tableau
  useEffect(() => {
    const thresholdReload = 3;
    if (
      swipeAction.direction === 'right' &&
      movies.length !== 0 &&
      movies.length - currentMovieIndex <= thresholdReload &&
      hasMoreMovies
    ) {
      console.log('recharge !!!');
      const newPage = moviePage + 1;
      setMoviePage(newPage);
      getMovies(newPage, countryChosen, genreChosen.id);
    }
  }, [swipeAction.direction, movies.length, currentMovieIndex]);

  useEffect(() => {
    if (Object.keys(movieDetail).length !== 0) {
      storeDetailsData(movieDetail, displayType);
    }
  }, [movieDetail]);

  // useEffect(() => {
  //   if (countryChosen !== '') {
  //     setIsoCountry(findIsoCountry(countryChosen));
  //   }
  // }, [countryChosen]);

  useEffect(() => {
    if (Object.keys(movieDetail).length)
      setCertification({
        imgUrl: findCertificationFr(displayType, movieDetail).imgUrl,
        alt: findCertificationFr(displayType, movieDetail).alt,
      });
  }, [movieDetail]);

  return (
    <SwipeComponent2
      movies={movies}
      movieDetail={movieDetail}
      nextMovieDetail={nextMovieDetail}
      error={error}
      loading={loading}
      currentMovieIndex={currentMovieIndex}
      setCurrentMovieIndex={setCurrentMovieIndex}
      swipeAction={swipeAction}
      setSwipeAction={setSwipeAction}
      countryChosen={countryChosen}
      setCountryChosen={setCountryChosen}
      // isoCountry={isoCountry}
      hasMoreMovies={hasMoreMovies}
      genreChosen={genreChosen}
      setGenreChosen={setGenreChosen}
      certification={certification}
      moviesStatusUpdated={moviesStatusUpdated}
      setMoviesStatusUpdated={setMoviesStatusUpdated}
    />
  );
};

export default SwipeContainer;
