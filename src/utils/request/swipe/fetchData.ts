import { countries } from '@utils/data/Countries';
import axios from 'axios';

// Récupération de 20 films pour le swipe
export const fetchTwentyMovies = async (moviePage) => {
  try {
    console.log('url', `http://localhost:8800/api/movies/all?page=${moviePage}`);
    
    const response = await axios.get(`http://localhost:8800/api/movies/all?page=${moviePage}`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

// Récupération des informations détaillées d'un film
export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/movies/details/${movieId}?language=fr-FR`,
    );

    // Récupération des noms de pays producteurs du film
    const countriesOfTheMovie = response.data.production_countries;   
    
    let frenchCountryNames;

    if (countriesOfTheMovie.length === 0) {
      frenchCountryNames = ['Non spécifié'];
    } else {
      // Tableau des noms français des pays
      frenchCountryNames = countriesOfTheMovie.map(({ iso_3166_1 }) => {
      const findCountry = countries.find(country => country.iso_3166_1 === iso_3166_1);
        return findCountry ? findCountry.native_name : iso_3166_1; 
      });
    }

    return [response.data, frenchCountryNames];
  } catch (error) {
    throw error;
  }
};
