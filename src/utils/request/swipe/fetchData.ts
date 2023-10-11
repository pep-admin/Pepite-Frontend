import { countries } from '@utils/data/Countries';
import axios from 'axios';

// Récupération de 20 films pour le swipe
export const fetchTwentyMovies = async (
  moviePage: number,
  displayType: string,
) => {
  const response = await axios.get(
    `http://localhost:8800/api/movies/all?page=${moviePage}&type=${displayType}`,
    { withCredentials: true },
  );

  return response.data.results;
};

// Récupération des informations détaillées d'un film
export const fetchMovieDetails = async (
  movieId: number,
  displayType: string,
) => {
  const response = await axios.get(
    `http://localhost:8800/api/movies/details/${movieId}?type=${displayType}`,
    { withCredentials: true },
  );

  if (displayType === 'movie') {
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
  } else if (displayType === 'tv') {
    // Récupération des noms de pays producteurs du film
    const countriesOfTheSerie = response.data.origin_country;

    let frenchCountryNames;

    if (countriesOfTheSerie.length === 0) {
      frenchCountryNames = ['Non spécifié'];
    } else {
      // Tableau des noms français des pays
      frenchCountryNames = countriesOfTheSerie.map(({ iso_3166_1 }) => {
        const findCountry = countries.find(
          country => country.iso_3166_1 === iso_3166_1,
        );
        return findCountry ? findCountry.native_name : iso_3166_1;
      });
    }

    return [response.data, frenchCountryNames];
  }
};

// Insertion d'un film dans la liste des déjà vus
export const addSeenMovie = async (movieId: number) => {
  try {
    console.log('id du film', movieId);

    const response = await axios.post(
      `http://localhost:8800/api/movies/add_already_seen`,
      { movie_id: movieId },
      { withCredentials: true },
    );
    console.log(response.data);
  } catch {
    console.log("Impossible d'ajouter un film dans la liste de déjà vus");
  }
};

// Suppression d'un film de la liste des déjà vus
export const removeSeenMovie = async (movieId: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:8800/api/movies/remove_already_seen`,
      {
        data: { movie_id: movieId },
        withCredentials: true,
      },
    );
    console.log(response.data);
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};
