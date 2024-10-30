import axios from 'axios';
import { parseDatabaseData } from '../../functions/parseDetails';
import { apiBaseUrl } from '../config';

// Récupération des critiques d'un utilisateur
export const getCriticsOfUserRequest = async (type: string, userId: number) => {
  const response = await axios.get(`${apiBaseUrl}/critics/all/${userId}`, {
    params: { type: type },
    withCredentials: true,
  });

  if (!Array.isArray(response.data.critics)) {
    return [];
  }

  const parsedData = response.data.critics.map(critic =>
    parseDatabaseData(critic),
  );

  return parsedData;
};
