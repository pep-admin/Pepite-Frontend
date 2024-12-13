import axios from 'axios';
import { apiBaseUrl } from '../config';
import { parseDatabaseData } from '@utils/functions/parseDetails';

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

  if (!Array.isArray(response.data.goldNuggets)) {
    return [];
  }

  const parsedData = response.data.goldNuggets.map(goldNugget =>
    parseDatabaseData(goldNugget),
  );

  return parsedData;
};
