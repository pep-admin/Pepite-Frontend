import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getUsersSuggestions = async (cardsToShow, suggestionsPage) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users/suggestion`, {
      params: { limit: cardsToShow, page: suggestionsPage },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log("erreur dans la recherche de l'utilisateur :", error);
  }
};
