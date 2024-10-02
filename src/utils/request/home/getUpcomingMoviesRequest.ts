import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getUpcomingMoviesRequest = async (page: number) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movies/upcoming`, {
      params: { page: page },
      withCredentials: true,
    });

    return response.data.movies;
  } catch (error) {
    console.log('erreur =>', error);
  }
};
