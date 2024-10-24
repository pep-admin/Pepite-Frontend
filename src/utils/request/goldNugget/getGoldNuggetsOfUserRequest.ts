import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération de toutes les critiques d'un utilisateur
export const getGoldNuggetsOfUserRequest = async (
  type: string,
  userId: number
) => {
  const response = await axios.get(
    `${apiBaseUrl}/critics_gold/all/${userId}`,
    {
      params: { type: type },
      withCredentials: true,
    },
  );

  return response.data;
};
