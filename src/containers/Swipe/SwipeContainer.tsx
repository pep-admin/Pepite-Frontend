// Libs externes
import { useState, useEffect, useCallback, useRef } from 'react';

// Imports internes
import SwipeComponent from '@views/Swipe/SwipeComponent';
import {
  fetchMovieDetails,
  fetchTwentyMovies,
} from '@utils/request/swipe/fetchData';
import { useData } from '@hooks/DataContext';

import {
  findCertificationFr,
  findIsoCountry,
} from '@utils/functions/findInfos';

const SwipeContainer = () => {
  const [movies, setMovies] = useState([]); // tableau des films / séries pour laisser une marge de swipe
  const [hasMoreMovies, setHasMoreMovies] = useState(true); // S'il y'a toujours des films à récupérer
  const [movieDetail, setMovieDetail] = useState([]); // Informations détaillées sur le film affiché
  const [generalRatings, setGeneralRatings] = useState(0); // Note générale
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0); // Index du film affiché
  const [moviePage, setMoviePage] = useState(1); // Numéro de la page de l'API
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null); // Gauche ou droite
  const [countryChosen, setCountryChosen] = useState('États-Unis');
  const [isoCountry, setIsoCountry] = useState('US');
  const [genreChosen, setGenreChosen] = useState({ name: null, id: null });
  const [certification, setCertification] = useState({
    imgUrl: null,
    alt: null,
  });
  const [loading, setLoading] = useState({ movies: true, details: true }); // Premier chargement
  const [error, setError] = useState({ message: null, error: null }); // Erreur lors du chargement

  const { displayType } = useData();

  const moviesRef = useRef(movies);

  useEffect(() => {
    moviesRef.current = movies;
  }, [movies]);

  // Récupère 20 films selon la page
  const getMovies = useCallback(
    async (moviePage, countryChosen, genreChosen) => {
      try {
        // Minimum d'affichage du Skeleton pendant 2 secondes
        const loadingTimer = new Promise(resolve => setTimeout(resolve, 2000));

        const moviesData = await fetchTwentyMovies(
          moviePage,
          displayType,
          countryChosen,
          genreChosen,
        );

        if (!moviesData.unwatched.length || moviesData.unwatched.length < 20) {
          setHasMoreMovies(false);
        }

        // Les films qui ne sont pas dans les films non voulus
        const wantedIDs = moviesData.wanted.map(movie => movie.id);
        // Les films qui ne sont pas dans les films déjà vus
        const unwatchedIDs = moviesData.unwatched.map(movie => movie.id);

        // Supprime les films qui ont déjà été vus et qui ne sont pas souhaités
        const filteredMovies = moviesData.unwatched.filter(
          movie =>
            wantedIDs.includes(movie.id) && unwatchedIDs.includes(movie.id),
        );

        // Ajoute la propriété "isAlreadySeen" à chaque film
        const moviesWithAlreadySeen = filteredMovies.map(movie => ({
          ...movie,
          is_already_seen: false,
          is_deleted: false,
          is_wanted: false,
        }));

        setMovies(prevMovies => [...prevMovies, ...moviesWithAlreadySeen]);

        await Promise.all([moviesData, loadingTimer]);
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

  useEffect(() => {
    setLoading({ movies: true, details: true });
    setMovies([]); // Réinitialisation des données liées aux films/séries
    setMoviePage(1); // Réinitialisation à la page à 1
    setCurrentMovieIndex(0); // Réinitialisation l'index courant à 0
    setSwipeDirection(null);
    getMovies(1, countryChosen, genreChosen.id); // Recharger les films/séries
  }, [displayType, countryChosen, genreChosen.id]);

  // Ajoute 20 nouveaux films lorsque l'utilisateur arrive à 3 films avant la fin du tableau
  useEffect(() => {
    const threshold = 3;

    if (
      swipeDirection === 'right' &&
      movies.length !== 0 &&
      movies.length - currentMovieIndex <= threshold &&
      hasMoreMovies
    ) {
      const newPage = moviePage + 1;
      setMoviePage(newPage);
      getMovies(newPage, countryChosen, genreChosen.id);
    }
  }, [swipeDirection, movies.length, currentMovieIndex]);

  // Récupère les informations détaillées d'un film
  useEffect(() => {
    if (movies.length === 0 || currentMovieIndex === -1) return;

    const currentMovieId = movies[currentMovieIndex].id;
    if (currentMovieId === null) return;

    const getMovieDetails = async () => {
      try {
        let detailsData;
        let cachedData = null;

        if (displayType === 'movie') {
          cachedData = localStorage.getItem(`movieDetails-${currentMovieId}`);
        } else if (displayType === 'tv') {
          cachedData = localStorage.getItem(`serieDetails-${currentMovieId}`);
        }

        // Si les données sont présentes dans le local storage
        if (cachedData !== null) {
          detailsData = JSON.parse(cachedData);
          console.log(
            'utilisation du cache local storage pour',
            currentMovieId,
          );
        }
        // Si nouvelles données, on fait la requête
        else {
          detailsData = await fetchMovieDetails(currentMovieId, displayType);
          console.log('requêtes film détaillé effectué', detailsData);

          // Ajout des données au local storage
          if (displayType === 'movie') {
            localStorage.setItem(
              `movieDetails-${currentMovieId}`,
              JSON.stringify(detailsData),
            );
          } else if (displayType === 'tv') {
            localStorage.setItem(
              `serieDetails-${currentMovieId}`,
              JSON.stringify(detailsData),
            );
          }
        }

        setMovieDetail(detailsData);
        setGeneralRatings(detailsData[0].vote_average);
      } catch (err) {
        setError({
          message: 'Erreur dans la récupération des détails du film.',
          error: err,
        });
      } finally {
        setLoading(prevLoading => ({
          movies: prevLoading.movies,
          details: false,
        }));
      }
    };
    getMovieDetails();
  }, [movies, currentMovieIndex, genreChosen]);

  useEffect(() => {
    if (countryChosen !== '') {
      setIsoCountry(findIsoCountry(countryChosen));
    }
  }, [countryChosen]);

  useEffect(() => {
    if (movieDetail.length !== 0)
      setCertification({
        imgUrl: findCertificationFr(displayType, movieDetail).imgUrl,
        alt: findCertificationFr(displayType, movieDetail).alt,
      });
  }, [movieDetail]);

  useEffect(() => {
    if (movies.length !== 0) console.log(movies);
  }, [movies]);

  // useEffect(() => {
  //   console.log('chargement...', loading);
  // }, [loading]);

  // useEffect(() => {
  //   console.log('Au moins 20 films à récupérer ?', hasMoreMovies);
  // }, [hasMoreMovies]);

  return (
    <SwipeComponent
      movies={movies}
      setMovies={setMovies}
      movieDetail={movieDetail}
      generalRatings={generalRatings}
      error={error}
      loading={loading}
      currentMovieIndex={currentMovieIndex}
      setCurrentMovieIndex={setCurrentMovieIndex}
      swipeDirection={swipeDirection}
      setSwipeDirection={setSwipeDirection}
      countryChosen={countryChosen}
      setCountryChosen={setCountryChosen}
      isoCountry={isoCountry}
      hasMoreMovies={hasMoreMovies}
      genreChosen={genreChosen}
      setGenreChosen={setGenreChosen}
      certification={certification}
    />
  );
};

export default SwipeContainer;
