import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération des informations supplémentaires d'un film
export const getMovieExternalLinksRequest = async (
  type: string,
  movieId: number,
) => {
  const response = await axios.get(
    `${apiBaseUrl}/movies/external_links`,
    { 
      params: { type: type, movieId: movieId },
      withCredentials: true 
    },
  );  

  return response.data.links;
};