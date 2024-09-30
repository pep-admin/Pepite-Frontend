import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getPopularMoviesRequest = async (page : number) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/movies/popular`,
      {
        params: { page: page },
        withCredentials: true,
      });

    return response.data.movies.results;
    
  } catch (error) {
    console.log('erreur =>', error);
    
  }
}