// Libs externes
import { useState, useEffect, useCallback } from 'react';

// Imports internes
import SwipeComponent from '@views/Swipe/SwipeComponent';
import {
  fetchMovieDetails,
  fetchTwentyMovies,
} from '@utils/request/swipe/fetchData';

const SwipeContainer = () => {
  const [initialRender, setInitialRender] = useState(false); // Permet un affichage minimum du skeletton
  const [movieId, setMovieId] = useState(null); // Movie Id pour récupérer les infos détaillées du film affiché
  const [movies, setMovies] = useState([]); // 20 films pour laisser une marge de swipe
  const [movieDetail, setMovieDetail] = useState([]); // Informations détaillées sur le film affiché
  const [generalRatings, setGeneralRatings] = useState(0); // Note générale
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0); // Index du film affiché
  const [moviePage, setMoviePage] = useState(1); // Numéro de la page de l'API
  const [swipeDirection, setSwipeDirection] = useState(null); // Gauche ou droite
  const [loading, setLoading] = useState({ movies: true, details: true }); // Premier chargement
  const [error, setError] = useState({ message: null, error: null }); // Erreur lors du chargement

  // Récupère 20 films selon la page
  const getMovies = useCallback(async moviePage => {
    try {
      const moviesData = await fetchTwentyMovies(moviePage);

      // Ajoute la propriété "isAlreadySeen" à chaque film
      const moviesWithAlreadySeen = moviesData.map(movie => ({
        ...movie,
        is_already_seen: false, // Par défaut, aucun film n'est déjà vu
      }));

      if (swipeDirection === 'right' || swipeDirection === null) {
        setMovies(prevMovies => [...prevMovies, ...moviesWithAlreadySeen]);
      }
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
  }, []);

  // Ajoute 20 nouveaux films lorsque l'utilisateur arrive à 3 films avant la fin du tableau
  useEffect(() => {
    const threshold = 3;
    console.log('index courant => ', currentMovieIndex);

    if (
      swipeDirection === 'right' &&
      movies.length - currentMovieIndex <= threshold
    ) {
      console.log('20 nouveaux films');

      const newPage = moviePage + 1;
      setMoviePage(newPage);
      getMovies(newPage);
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
          movieDetailsData = await fetchMovieDetails(movieId);
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
        if (initialRender) {
          setLoading(prevLoading => ({
            movies: prevLoading.movies,
            details: false,
          }));
        }
      }
    };
    getMovieDetails();
  }, [movieId, initialRender]);

  // Récupère l'id du film affiché
  useEffect(() => {
    if (movies.length > 0 && movies[currentMovieIndex].id !== null) {
      const currentMovieId = movies[currentMovieIndex].id;
      setMovieId(currentMovieId);
    }
  }, [movies, currentMovieIndex]);

  // Récupération de la page 1 des films
  useEffect(() => {
    // console.log('premier rendu');

    getMovies(moviePage);
    setTimeout(() => {
      setInitialRender(true);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log('page de films', movies);
  }, [movies]);

  // useEffect(() => {
  //   console.log('numéro de page', moviePage);
  // }, [moviePage]);

  // useEffect(() => {
  //   console.log('chargement', loading);
  // }, [loading]);

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
      setSwipeDirection={setSwipeDirection}
    />
  );
};

export default SwipeContainer;
