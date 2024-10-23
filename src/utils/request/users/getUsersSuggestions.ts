import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getUsersSuggestions = async (cardsToShow, suggestionsPage) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/contacts/suggestions/gold`, {
      params: { limit: cardsToShow, page: suggestionsPage },
      withCredentials: true,
    });

    console.log(response);
    

    return response;
  } catch (error) {
    console.log("erreur dans la recherche de l'utilisateur :", error);
  }
};
