import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération des crédits d'un film (casting)
export const getMovieCreditsRequest = async (type: string, id: number) => {
  const response = await axios.get(`${apiBaseUrl}/movies/credits/${id}`, {
    params: { type: type },
    withCredentials: true,
  });

  return response.data.credits;
};
