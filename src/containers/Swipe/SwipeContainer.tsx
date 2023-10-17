// Libs externes
import { useState, useEffect, useCallback } from 'react';

// Imports internes
import SwipeComponent from '@views/Swipe/SwipeComponent';
import {
  fetchMovieDetails,
  fetchTwentyMovies,
} from '@utils/request/swipe/fetchData';
import { useData } from '@hooks/DataContext';

import { findIsoCountry } from '@utils/functions/findCountry';

const SwipeContainer = () => {
  const [movieId, setMovieId] = useState(null); // Movie Id pour récupérer les infos détaillées du film affiché
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
  const [loading, setLoading] = useState({ movies: true, details: true }); // Premier chargement
  const [error, setError] = useState({ message: null, error: null }); // Erreur lors du chargement

  const { displayType } = useData();

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

        if (!moviesData.length || moviesData.length < 20) {
          setHasMoreMovies(false);
        }

        // Ajoute la propriété "isAlreadySeen" à chaque film
        const moviesWithAlreadySeen = moviesData.map(movie => ({
          ...movie,
          is_already_seen: false, // Par défaut, aucun film n'est déjà vu
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
    if (movieId === null) return;
    const getMovieDetails = async () => {
      try {
        let movieDetailsData;

        const cachedData = localStorage.getItem(`movieDetails-${movieId}`);

        // Si les données sont présentes dans le local storage
        if (cachedData) {
          movieDetailsData = JSON.parse(cachedData);
          console.log('utilisation du cache local storage pour', movieId);
        }
        // Si nouvelles données, on fait la requête
        else {
          movieDetailsData = await fetchMovieDetails(movieId, displayType);
          console.log('requêtes film détaillé effectué', movieDetailsData);

          // Ajout des données au local storage
          localStorage.setItem(
            `movieDetails-${movieId}`,
            JSON.stringify(movieDetailsData),
          );
        }

        setMovieDetail(movieDetailsData);
        setGeneralRatings(movieDetailsData[0].vote_average);
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
  }, [movieId, genreChosen]);

  // Récupère l'id du film affiché
  useEffect(() => {
    if (currentMovieIndex === -1) return;

    if (
      movies.length > 0 &&
      movies[currentMovieIndex].id !== null &&
      !loading.movies
    ) {
      const currentMovieId = movies[currentMovieIndex].id;
      setMovieId(currentMovieId);
    }

    if (movies.length === 0 && !loading.movies) {
      console.log('aucun film à récupérer');
      setMovieId(null);
    }
  }, [movies, currentMovieIndex, loading, countryChosen, genreChosen]);

  useEffect(() => {
    if (countryChosen !== '') {
      setIsoCountry(findIsoCountry(countryChosen));
    }
  }, [countryChosen]);

  useEffect(() => {
    if (movies.length > 0) console.log('page de films', movies);
  }, [movies]);

  // useEffect(() => {
  //   console.log(genreChosen);

  // }, [genreChosen])

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
    />
  );
};

export default SwipeContainer;
