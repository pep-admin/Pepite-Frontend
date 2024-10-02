import axios from 'axios';
// import { parseDatabaseData } from './parseDetails';
import { apiBaseUrl } from './config';

// const isDataFromDatabase = data => {
//   return Object.prototype.hasOwnProperty.call(data, 'are_details_completed');
// };

// Récupération des informations détaillées d'un film
export const getMovieDetails = async (displayType: string, movieId: number) => {
  const response = await axios.get(
    `${apiBaseUrl}/movies/details/${movieId}?type=${displayType}`,
    { withCredentials: true },
  );

  // On vérifie d'où proviennent les données et on parse en conséquence
  // let parsedData;

  // if (isDataFromDatabase(response.data)) {
  //   // console.log('requête DB pour', movieId);
  //   parsedData = parseDatabaseData(response.data, displayType, null);
  // } else {
  // console.log('requête TMDB pour', movieId);
  // parsedData = response.data;
  // }

  return response.data;
};
