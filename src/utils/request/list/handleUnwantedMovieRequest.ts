import axios from 'axios';
import { apiBaseUrl } from '../config';

// Insertion / annulation d'un film de la liste des non souhaités
export const handleUnwantedMovieRequest = async (
  movieId: number,
  type: string,
  unwanted: boolean,
) => {
  if (unwanted) {
    await axios.post(
      `${apiBaseUrl}/list/unwanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );

    return { message: `ne vous sera plus proposé.` };
  } else {
    await axios.delete(`${apiBaseUrl}/list/recover_unwanted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });

    return { message: `pourra vous être proposé.` };
  }
};
