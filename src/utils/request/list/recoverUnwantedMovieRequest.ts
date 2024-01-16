import axios from 'axios';
import apiBaseUrl from '../config';

// Annulation d'un film non souhaité
export const recoverUnwantedMovieRequest = async (
  movieId: number,
  type: string,
) => {
  try {
    await axios.delete(`${apiBaseUrl}/list/recover_unwanted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch {
    console.log(
      'Impossible de retirer un film / série de la liste des films / séries non souhaité(e)s',
    );
  }
};
