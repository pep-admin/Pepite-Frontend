import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération de toutes les critiques d'un utilisateur
export const getAllGoldNuggetsOfUser = async (
  type,
  userId,
  cardsToShow,
  goldNuggetsPage,
) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_gold/all/${userId}`,
      {
        params: { type: type, limit: cardsToShow, page: goldNuggetsPage },
        withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    console.log('erreur dans la récupération des pépites', error);
  }
};
