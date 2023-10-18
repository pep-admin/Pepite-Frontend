import { countries } from '@utils/data/countries';
import { findIsoCountry } from '@utils/functions/findInfos';
import { getAllLocalStorage } from '@utils/functions/getAllLocalStorage';
import axios from 'axios';

// Récupération de 20 films pour le swipe
export const fetchTwentyMovies = async (
  moviePage: number,
  displayType: string,
  countryChosen: string,
  genreChosen: null | number,
) => {
  let countryString;
  let genreString;

  if (countryChosen !== '')
    countryString = `&with_origin_country=${findIsoCountry(countryChosen)}`;
  else countryString = '';

  if (genreChosen !== null) genreString = `&with_genres=${genreChosen}`;
  else genreString = '';

  const response = await axios.get(
    `http://localhost:8800/api/movies/all?page=${moviePage}&type=${displayType}${countryString}${genreString}`,
    { withCredentials: true },
  );

  return response.data.results;
};

// Récupération des informations détaillées d'un film
export const fetchMovieDetails = async (
  movieId: number,
  displayType: string,
) => {
  console.log('id dans le fetch', movieId);

  let certification = '';

  if (displayType === 'movie')
    certification = '&append_to_response=release_dates';
  else if (displayType === 'tv')
    certification = '&append_to_response=content_ratings';

  const response = await axios.get(
    `http://localhost:8800/api/movies/details/${movieId}?type=${displayType}${certification}`,
    { withCredentials: true },
  );

  console.log(
    `http://localhost:8800/api/movies/details/${movieId}?type=${displayType}${certification}`,
  );

  console.log(response);

  // Récupération des noms de pays producteurs du film
  const countriesOfTheMovie = response.data.production_countries;

  let frenchCountryNames;

  if (countriesOfTheMovie.length === 0) {
    frenchCountryNames = ['Non spécifié'];
  } else {
    // Tableau des noms français des pays
    frenchCountryNames = countriesOfTheMovie.map(({ iso_3166_1 }) => {
      const findCountry = countries.find(
        country => country.iso_3166_1 === iso_3166_1,
      );
      return findCountry ? findCountry.native_name : iso_3166_1;
    });
  }

  return [response.data, frenchCountryNames];
};

// Insertion d'un film dans la liste des déjà vus
export const addSeenMovie = async (movieId: number, type: string) => {
  try {
    console.log('id du film', movieId);

    const response = await axios.post(
      `http://localhost:8800/api/movies/add_already_seen`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
    console.log(response.data);
  } catch {
    console.log("Impossible d'ajouter un film dans la liste de déjà vus");
  }
};

// Suppression d'un film de la liste des déjà vus
export const removeSeenMovie = async (movieId: number, type: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8800/api/movies/remove_already_seen`,
      {
        data: { movie_id: movieId, type: type },
        withCredentials: true,
      },
    );
    console.log(response.data);
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};

// Déconnexion de l'utilisateur
export const handleLogout = async () => {
  try {
    // Étape 1: Stocker les données
    const localStorageData = getAllLocalStorage();
    const response = await axios.post(
      'http://localhost:8800/api/movies/store_details',
      localStorageData,
      { withCredentials: true },
    );

    if (response.status !== 200) {
      throw new Error('Impossible de stocker les données');
    }

    // Étape 2: Déconnexion de l'utilisateur
    const logoutResponse = await axios.post(
      'http://localhost:8800/api/auth/logout',
      {},
      { withCredentials: true },
    );
    if (logoutResponse.status !== 200) {
      throw new Error('Failed to logout');
    }
  } catch (err) {
    console.error('Error during logout:', err.message);
  }
};
