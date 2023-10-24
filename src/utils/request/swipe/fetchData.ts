import { countries } from '@utils/data/Countries';
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

  return response.data;
};

// Récupération des informations détaillées d'un film
export const fetchMovieDetails = async (
  movieId: number,
  displayType: string,
) => {
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
    await axios.post(
      `http://localhost:8800/api/movies/add_already_seen`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log("Impossible d'ajouter un film dans la liste de déjà vus");
  }
};

// Suppression d'un film de la liste des déjà vus
export const removeSeenMovie = async (movieId: number, type: string) => {
  try {
    await axios.delete(`http://localhost:8800/api/movies/remove_already_seen`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
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
      throw new Error('Déconnexion impossible');
    }
  } catch (err) {
    console.error('Erreur durant la déconnexion :', err.message);
  }
};

// Insertion d'un film dans la liste des non souhaités
export const addUnwantedMovie = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `http://localhost:8800/api/movies/unwanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log(
      "Impossible d'ajouter ce film dans la liste des films non souhaités",
    );
  }
};

// Annulation d'un film non souhaité
export const cancelDeletedMovie = async (movieId: number, type: string) => {
  try {
    await axios.delete(`http://localhost:8800/api/movies/cancel_deleted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch {
    console.log(
      "Impossible d'annuler un film de la liste des films non souhaités",
    );
  }
};

// Recherche film / série / personne
export const searchMulti = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/search/multi?query=${query}`,
      { withCredentials: true },
    );

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Insertion d'un film dans la liste des non souhaités
export const addWantedMovie = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `http://localhost:8800/api/movies/add_wanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log(
      "Impossible d'ajouter ce film dans la liste des films non souhaités",
    );
  }
};

// Annulation d'un film souhaité
export const removeWantedMovie = async (movieId: number, type: string) => {
  try {
    await axios.delete(`http://localhost:8800/api/movies/cancel_wanted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch {
    console.log("Impossible d'annuler un film de la liste des films souhaités");
  }
};
