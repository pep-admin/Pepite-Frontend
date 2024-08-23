// Import des libs externes
import { useState, useEffect } from 'react';

// Import des composants internes
import SwipeComponent from '@views/Swipe/SwipeComponent';
import SwipeComponent2 from '@views/Swipe/SwipeComponent2';

// Import des requêtes
import { fetchTwentyMovies } from '@utils/request/swipe/getMoviesSwipe';
import { storeDetailsData } from '@utils/request/swipe/storeDetailsData';
import { getMovieDetails } from '@utils/request/getMovieDetails';

const SwipeContainer = () => {
  const [movies, setMovies] = useState([]); // tableau des films / séries pour laisser une marge de swipe
  // const [moviesStatusUpdated, setMoviesStatusUpdated] = useState([]); // Copie du tableau des films / séries + les status "unwanted", "watched", "wanted"
  const [hasMoreMovies, setHasMoreMovies] = useState(true); // S'il y'a toujours des films à récupérer
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [moviePage, setMoviePage] = useState(null); // Numéro de la page de l'API

  // Etats de filtres
  const [typeChosen, setTypeChosen] = useState('movie'); // Films ou séries pour le swipe
  const [countryChosen, setCountryChosen] = useState({
    name: 'États-Unis',
    code: 'US',
  });
  const [genreChosen, setGenreChosen] = useState({ id: 0, name: 'Tous' });
  const [ratingChosen, setRatingChosen] = useState({
    number: null,
    value: null,
  }); // Note générale
  const [periodChosen, setPeriodChosen] = useState({ id: 0, name: 'Toutes' }); // Période de productions des films / séries
  const [isFilterValidated, setIsFilterValidated] = useState(false);

  const [loading, setLoading] = useState({ movies: true, details: true }); // Premier chargement
  const [error, setError] = useState({ message: null, error: null }); // Erreur lors du chargement

  // Récupère 20 films selon la page
  const getMovies = async (moviePage, countryChosen, genreChosen) => {
    try {
      setIsSwiping(true); // Désactiver temporairement le swipe pendant le chargement

      // Minimum d'affichage du Skeleton pendant 2 secondes
      // const loadingTimer = new Promise(resolve => setTimeout(resolve, 2000));

      const elligibleMovies = await fetchTwentyMovies(
        moviePage,
        typeChosen,
        countryChosen,
        genreChosen,
        ratingChosen.number,
        periodChosen.name,
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
      // setMoviesStatusUpdated(prevMovies => [
      //   ...prevMovies,
      //   ...moviesWithOptions,
      // ]);

      // await Promise.all([elligibleMovies, loadingTimer]);
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
      setIsSwiping(false); // Réactiver le swipe après le chargement
    }
  };

  // Ajoute 20 nouveaux films lorsque l'utilisateur arrive à 3 films avant la fin du tableau
  useEffect(() => {
    const thresholdReload = 3;
    if (
      movies.length !== 0 &&
      movies.length - currentIndex <= thresholdReload &&
      hasMoreMovies
    ) {
      console.log('recharge !!!');
      const newPage = moviePage + 1;
      setMoviePage(newPage);
      getMovies(newPage, countryChosen, genreChosen.id);
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log('Current Index:', currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    setMoviePage(randomPage);
    getMovies(randomPage, countryChosen, genreChosen.id);
  }, []);

  return (
    !loading.movies &&
    <SwipeComponent2 
      movies={movies}
      // currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      // isSwiping={isSwiping}
      // setIsSwiping={setIsSwiping}
      typeChosen={typeChosen}
      setTypeChosen={setTypeChosen}
      countryChosen={countryChosen}
      setCountryChosen={setCountryChosen}
      genreChosen={genreChosen}
      setGenreChosen={setGenreChosen}
      ratingChosen={ratingChosen}
      setRatingChosen={setRatingChosen}
      periodChosen={periodChosen}
      setPeriodChosen={setPeriodChosen}
    />
  );
};

export default SwipeContainer;
