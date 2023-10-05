// Libs externes
import { useState, useEffect } from 'react';

// Imports internes
import SwipeComponent from '@views/Swipe/SwipeComponent';
import {
  fetchMovieDetails,
  fetchTwentyMovies,
} from '@utils/request/swipe/fetchData';

const SwipeContainer = () => {
  // Movie Id pour récupérer les infos détaillées du film affiché
  const [movieId, setMovieId] = useState(null);

  // 20 films pour laisser une marge de swipe et film détaillé
  const [movies, setMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);
  const [generalRatings, setGeneralRatings] = useState(null);

  // Index permettant de swiper, commence à l'index 9 pour laisser une marge de 10 de chaque côté
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [moviePage, setMoviePage] = useState(1);
  const [swipeDirection, setSwipeDirection] = useState(null);

  // Gestion du chargement et erreurs
  const [loading, setLoading] = useState({ movies: true, details: true });
  const [error, setError] = useState(null);

  const getMovies = async (moviePage) => {
    try {
      const moviesData = await fetchTwentyMovies(moviePage);

      if(swipeDirection === 'right' || swipeDirection === null) {
        setMovies(prevMovies => [...prevMovies, ...moviesData]);
      }
    } catch (err) {      
      setError('Erreur lors de la récupération des détails du film.');
    } finally {
      setLoading({ movies: false, details: loading.details });
    }
  };

  // Ajoute 20 nouveaux films lorsque l'utilisateur arrive à 3 films avant la fin du tableau
  useEffect(() => {
    const threshold = 3; 
    console.log('swipe direction', swipeDirection);
    console.log('index', currentMovieIndex);
    console.log('longueur du tableau de films', movies.length);

    if(swipeDirection === 'right' && movies.length - currentMovieIndex <= threshold) {
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
        const movieDetailsData = await fetchMovieDetails(movieId);
 
        console.log('requêtes film détaillé effectué', movieDetailsData);        

        setMovieDetail([
          { label: 'Type', value: 'Film' },
          {
            label: 'Genre',
            value: movieDetailsData[0].genres
              .map(genre => genre.name)
              .join(', '),
          },
          { label: 'Pays', 
            value: movieDetailsData[1].join(', ')
          },
          {
            label: 'Année',
            value: movieDetailsData[0].release_date.split('-')[0],
          },
          {
            label: 'Réalisation',
            value: '',
          },
          {
            label: 'Acteurs',
            value: '',
          },
        ]);

        setGeneralRatings(movieDetailsData[0].vote_average);

      } catch (err) {
        console.log('erreur', err);
        setError('Erreur lors de la récupération des détails du film.');
      } finally {
        setTimeout(() => {
          setLoading({ movies: loading.movies, details: false });
        }, 2000);
      }
    };
    getMovieDetails();
  }, [movieId]);

  // Récupère l'id du film affiché
  useEffect(() => {
    if (movies.length > 0 && movies[currentMovieIndex].id !== null) {
      const currentMovieId = movies[currentMovieIndex].id;
      setMovieId(currentMovieId);
    }
  }, [movies, currentMovieIndex]);

  useEffect(() => {
    console.log('rendu de base page 1');
    
    getMovies(moviePage);
  }, [])

  useEffect(() => {
    console.log('page de films', movies);
    
  }, [movies])

  useEffect(() => {
    console.log('numéro de page', moviePage);
    
  }, [moviePage])

  return (
    <SwipeComponent
      movies={movies}
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
