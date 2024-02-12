import axios from 'axios';
import { apiBaseUrl } from '../config';

// Annulation d'un film souhaité
export const removeWantedMovieRequest = async (
  movieId: number,
  type: string,
) => {
  try {
    await axios.delete(`${apiBaseUrl}/list/cancel_wanted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch (error) {
    console.log(
      "Impossible d'annuler un film de la liste des films souhaités",
      error,
    );
  }
};
