import axios from 'axios';
import { apiBaseUrl } from '../config';

// Insertion d'un film dans la liste des déjà vus
export const addWatchedMovieRequest = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/list/watched/add`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log("Impossible d'ajouter un film dans la liste de déjà vus");
  }
};
