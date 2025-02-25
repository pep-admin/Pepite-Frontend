import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération des films similaires
export const getMoviesByDirectorRequest = async (
  type: string,
  page: number,
  director: string,
  movieId: number,
) => {
  const response = await axios.get(`${apiBaseUrl}/movies/similar`, {
    params: {
      type: type,
      page: page,
      director: director,
      movieId: movieId,
    },
    withCredentials: true,
  });

  return response.data.movies;
};
