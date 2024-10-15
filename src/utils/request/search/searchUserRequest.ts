import axios from 'axios';
import { apiBaseUrl } from '../config';

// Recherche les utilisateurs
export const searchUserRequest = async (query: string) => {

    const response = await axios.get(
      `${apiBaseUrl}/search/users?query=${query}`,
      { withCredentials: true },
    );

    return response.data.results;
};
