import axios from 'axios';
import { apiBaseUrl } from '../config';

// Insertion d'un film dans la liste des films souhaités
export const handleWantedMovieRequest = async (
  movieId: number,
  type: string,
  wanted: boolean,
) => {
  if (wanted) {
    console.log(movieId, type);

    await axios.post(
      `${apiBaseUrl}/list/add_wanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );

    return { message: `a été ajouté à votre liste.` };
  } else {
    await axios.delete(`${apiBaseUrl}/list/cancel_wanted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });

    return { message: `a été retiré de votre liste.` };
  }
};
