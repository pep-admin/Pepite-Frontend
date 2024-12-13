import axios from 'axios';
import { apiBaseUrl } from '../config';

// Recherche les amis selon un champ de saisie
export const searchFriendsRequest = async (query: string) => {

    const response = await axios.get(
      `${apiBaseUrl}/search/friends?query=${query}`,
      { withCredentials: true },
    );

    return response.data.results;
};
