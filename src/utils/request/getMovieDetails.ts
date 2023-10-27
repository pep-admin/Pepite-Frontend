import { countriesList } from '@utils/data/Countries';
import axios from 'axios';

// Récupération des informations détaillées d'un film
const fetchMovieDetails = async (movieId: number, displayType: string) => {
  let certification = '';

  if (displayType === 'movie')
    certification = '&append_to_response=release_dates';
  else if (displayType === 'tv')
    certification = '&append_to_response=content_ratings';

  const response = await axios.get(
    `http://localhost:8800/api/movies/details/${movieId}?type=${displayType}${certification}`,
    { withCredentials: true },
  );

  // Récupération des noms de pays producteurs du film
  const countriesOfTheMovie = response.data.production_countries;

  let frenchCountryNames;

  if (countriesOfTheMovie.length === 0) {
    frenchCountryNames = ['Non spécifié'];
  } else {
    // Tableau des noms français des pays
    frenchCountryNames = countriesOfTheMovie.map(({ iso_3166_1 }) => {
      const findCountry = countriesList.find(
        country => country.iso_3166_1 === iso_3166_1,
      );
      return findCountry ? findCountry.native_name : iso_3166_1;
    });
  }

  return [response.data, frenchCountryNames];
};

export const getMovieDetails = async (displayType, currentMovieId) => {
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
    console.log('utilisation du cache local storage pour', currentMovieId);
    return detailsData;
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
    return detailsData;
  }
};
