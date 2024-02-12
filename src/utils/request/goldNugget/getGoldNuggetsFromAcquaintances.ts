import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération des pépites des amis, et des suivis
export const getGoldNuggetsFromAcquaintances = async (
  type,
  userId,
  cardsToShow,
  goldNuggetsPage,
) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_gold/acquaintances/${userId}`,
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
