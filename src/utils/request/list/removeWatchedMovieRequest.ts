import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'un film de la liste des déjà vus
export const removeWatchedMovieRequest = async (
  movieId: number,
  type: string,
) => {
  try {
    await axios.delete(`${apiBaseUrl}/list/watched/remove`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};
