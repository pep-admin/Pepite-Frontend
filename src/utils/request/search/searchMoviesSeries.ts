import axios from 'axios';
import { apiBaseUrl } from '../config';

// Recherche film / série
export const searchMoviesSeries = async (
  query: string,
  displayType: string,
) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/search/movie-serie?query=${query}&displayType=${displayType}`,
      { withCredentials: true },
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Recherche les utilisateurs
export const searchUsers = async (query: string) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/search/users?query=${query}`,
      { withCredentials: true },
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
