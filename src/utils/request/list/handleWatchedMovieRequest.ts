import axios from 'axios';
import { apiBaseUrl } from '../config';

// Insertion d'un film dans la liste des déjà vus
export const handleWatchedMovieRequest = async (movieId: number, type: string, watched: boolean) => {
  try {

    if(watched) {
      await axios.post(
        `${apiBaseUrl}/list/watched/add`,
        { movie_id: movieId, type: type },
        { withCredentials: true },
      );
    } else {
      await axios.delete(`${apiBaseUrl}/list/watched/remove`, {
        data: { movie_id: movieId, type: type },
        withCredentials: true,
      });
    }

    return { error: null }
    
  } catch {
    return {error: 'Erreur serveur : Impossible d\'effectuer l\'action.'};  
  }
};
