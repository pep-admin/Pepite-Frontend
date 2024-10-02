import axios from 'axios';
import { apiBaseUrl } from '../config';

// Insertion d'un film dans la liste des films souhaités
export const handleWantedMovieRequest = async (
  movieId: number,
  type: string,
  wanted: boolean,
) => {
  try {
    if (wanted) {
      await axios.post(
        `${apiBaseUrl}/list/add_wanted`,
        { movie_id: movieId, type: type },
        { withCredentials: true },
      );
    } else {
      await axios.delete(`${apiBaseUrl}/list/cancel_wanted`, {
        data: { movie_id: movieId, type: type },
        withCredentials: true,
      });
    }

    return { error: null };
  } catch {
    return { error: "Erreur serveur : Impossible d'effectuer l'action." };
  }
};
