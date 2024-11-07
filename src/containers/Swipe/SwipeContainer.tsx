// Import des libs externes
import { useState, useEffect } from 'react';

// Import des composants internes
import SwipeComponent from '@views/Swipe/SwipeComponent';

// Import des requêtes
import { getMoviesSwipe } from '@utils/request/swipe/getMoviesSwipe';
import { getMovieDetailsRequest } from '@utils/request/getMovieDetailsRequest';
import { getMovieCreditsRequest } from '@utils/request/film/getMovieCreditsRequest';
import { findDirectorName, findTopActors } from '@utils/functions/findCrewAndCast';
// import { storeDetailsData } from '@utils/request/swipe/storeDetailsData';

const SwipeContainer = () => {
  
  // Gestions des films
  const [movies, setMovies] = useState([]); // tableau des films / séries pour laisser une marge de swipe
  const [moviePage, setMoviePage] = useState(null); // Numéro de la page de l'API
  const [hasMoreMovies, setHasMoreMovies] = useState(true); // S'il y'a toujours des films à récupérer

  const [showMovieInfos, setShowMovieInfos] = useState(false); // Booléen pour ouvrir les infos détaillées
  const [movieDetails, setMovieDetails] = useState(null); // Les informations détaillées du film

  // Gestion de l'index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gestion des filtres
  const [typeChosen, setTypeChosen] = useState('movie'); // Films ou séries
  const [countryChosen, setCountryChosen] = useState({
    name: 'États-Unis',
    code: 'US',
  });
  const [genreChosen, setGenreChosen] = useState({
    id: 0,
    name: 'Tous',
  });
  const [ratingChosen, setRatingChosen] = useState({
    number: null,
    value: null,
  });
  const [periodChosen, setPeriodChosen] = useState({ id: 0, name: 'Toutes' }); // Période de productions des films / séries
  const [isFilterValidated, setIsFilterValidated] = useState(false);

  // Gestion du chargement et des erreurs
  const [loading, setLoading] = useState(true); // Chargement des 20 premiers films

  // Récupère 20 films selon la page
  const getMovies = async moviePage => {
    try {
      console.log('la page de films =>', moviePage);

      // Récupère 20 films / séries dont l'utilisateur n'a pas interagi
      const elligibleMovies = await getMoviesSwipe(
        moviePage,
        typeChosen,
        countryChosen.name,
        genreChosen.id,
        ratingChosen.number,
        periodChosen.name,
      );

      // Si il y a moins de 20 films, on fera apparaitre une carte qui indiquera qu'il n'y a plus rien à parcourir
      if (elligibleMovies.length < 20) {
        setHasMoreMovies(false);
      }

      // Ajoute les options à chaque film
      const moviesWithOptions = elligibleMovies.map(movie => ({
        ...movie,
        is_wanted: false,
        is_unwanted: false,
        is_watched: false,
        user_rating: null,
        is_gold_nugget: false,
        is_turnip: false,
      }));

      // Si l'utilisateur a choisi des filtres, on écrase le tableau
      if (isFilterValidated) {
        setMovies(moviesWithOptions);
        setIsFilterValidated(false);
      } else {
        setMovies(prevMovies => [...prevMovies, ...moviesWithOptions]);
      }
    } catch (err) {
      console.log('erreur !', err);
    } finally {
      setLoading(false);
    }
  };

  // Récupère les détails d'un film (genre, année...)
  const fetchMovieDetails = async movieId => {
    try {
      console.log('chargement des données détaillées');
      
      const details = await getMovieDetailsRequest(typeChosen, movieId);
      const credits = await getMovieCreditsRequest(typeChosen, movieId);

      const director = findDirectorName(credits.crew);
      const topActors = findTopActors(credits.cast);

      const detailsData = {...details, director: director, topActors: topActors};      

      setMovieDetails(detailsData);
    } catch (err) {
      console.log(err);
      
    }
  };

  useEffect(() => {
    if (showMovieInfos) {
      fetchMovieDetails(movies[currentIndex].id);
    } else {
      setMovieDetails(null);
    }
  }, [showMovieInfos, currentIndex]);

  // Charge 20 nouveaux films lorsque l'utilisateur arrive à 3 films avant la fin du tableau
  useEffect(() => {
    console.log('Current Index:', currentIndex);
    const thresholdReload = 3;
    if (
      movies.length !== 0 &&
      movies.length - currentIndex <= thresholdReload &&
      hasMoreMovies
    ) {
      console.log('recharge !!!');
      const newPage = moviePage + 1;
      setMoviePage(newPage);
      getMovies(newPage);
    }
  }, [currentIndex]);

  // Attribue un numéro de page aléatoire pour ne pas proposer tout le temps les mêmes films (à améliorer)
  useEffect(() => {
    getMovies(1);
    setMoviePage(1);
  }, []);

  // Recharge de nouveaux films en cas de filtrage
  useEffect(() => {
    if (isFilterValidated) {
      getMovies(1);
      setMoviePage(1);
    }
  }, [isFilterValidated]);

  useEffect(() => {
    console.log('les films !', movies);
  }, [movies]);

  return (
    !loading && (
      <SwipeComponent
        movies={movies}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        showMovieInfos={showMovieInfos}
        setShowMovieInfos={setShowMovieInfos}
        movieDetails={movieDetails}
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
        setIsFilterValidated={setIsFilterValidated}
      />
    )
  );
};

export default SwipeContainer;
