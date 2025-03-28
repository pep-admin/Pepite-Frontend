import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getUsersSuggestions = async (
  suggestionType,
  cardsToShow,
  suggestionsPage,
) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/contacts/suggestions/${suggestionType}`,
      {
        params: { limit: cardsToShow, page: suggestionsPage },
        withCredentials: true,
      },
    );

    console.log(response);

    return response;
  } catch (error) {
    console.log("erreur dans la recherche de l'utilisateur :", error);
  }
};
