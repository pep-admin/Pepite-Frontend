import axios from 'axios';
import { apiBaseUrl } from '../config';

// Insertion d'un film dans la liste des films souhaités
export const addWantedMovieRequest = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/list/add_wanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch (error) {
    console.log(
      error,
      "Impossible d'ajouter ce film dans la liste des films non souhaités",
    );
  }
};
