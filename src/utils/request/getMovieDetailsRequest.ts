import axios from 'axios';
import { apiBaseUrl } from './config';

// Récupération des informations détaillées d'un film
export const getMovieDetailsRequest = async (displayType: string, movieId: number) => {
  
  const type = displayType === 'movie' ? 'movie' : 'tv';

  const response = await axios.get(
    `${apiBaseUrl}/movies/details/${movieId}?type=${type}`,
    { withCredentials: true },
  );  

  return response.data;
};
