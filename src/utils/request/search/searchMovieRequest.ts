import axios from 'axios';
import { apiBaseUrl } from '../config';

// Recherche film / série
export const searchMovieRequest = async (
  query: string,
  displayType: string,
) => {

  const response = await axios.get(
    `${apiBaseUrl}/search/movie-serie?query=${query}&displayType=${displayType}`,
    { withCredentials: true },
  );

  return response.data.results;
  
};