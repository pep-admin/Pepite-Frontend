import axios from 'axios';

const isDataFromDatabase = data => {
  return Object.prototype.hasOwnProperty.call(data, 'are_details_completed');
};

const parseDatabaseData = data => {
  // Parsez les chaînes JSON pour les genres et les pays de production
  const genres = JSON.parse(data.genres);
  const production_countries = JSON.parse(data.production_countries);
  const id = Number(data.movie_id); // Assurez-vous que c'est un nombre
  const overview = data.overview; // String
  const poster_path = data.poster_path; // String
  const release_date = data.release_date;
  const release_dates = JSON.parse(data.release_dates); // Cela semble être un tableau, donc parsez si nécessaire
  const title = data.title; // String
  const vote_average = parseFloat(data.vote_average); // Convertir en nombre à virgule flottante

  return {
    genres,
    production_countries,
    id,
    overview,
    poster_path,
    release_date,
    release_dates,
    title,
    vote_average,
  };
};

// Récupération des informations détaillées d'un film
export const getMovieDetails = async (displayType: string, movieId: number) => {
  let certification = '';

  if (displayType === 'movie')
    certification = '&append_to_response=release_dates';
  else if (displayType === 'tv')
    certification = '&append_to_response=content_ratings';

  const response = await axios.get(
    `http://localhost:8800/api/movies/details/${movieId}?type=${displayType}${certification}`,
    { withCredentials: true },
  );

  // Vérifiez d'où proviennent les données et parsez-les en conséquence
  let parsedData;

  if (isDataFromDatabase(response.data)) {
    console.log('requête DB pour', movieId);
    parsedData = parseDatabaseData(response.data);
  } else {
    console.log('requête TMDB pour', movieId);
    parsedData = response.data;
  }

  return parsedData;
};
