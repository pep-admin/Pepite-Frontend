import axios from 'axios';
import apiBaseUrl from '../config';

// Récupération de maximum 20 pépites des amis, et des suivis
export const getGoldNuggetsFromAcquaintances = async (type, userId) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_gold/acquaintances/${userId}`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log('erreur dans la récupération des pépites', error);
  }
};
