import axios from 'axios';
import { parseDatabaseData } from '../../functions/parseDetails';
import { apiBaseUrl } from '../config';

// Récupération des critiques d'un utilisateur
export const getCriticsOfUser = async (userId, type, page, limit) => {
  const response = await axios.get(`${apiBaseUrl}/critics/all/${userId}`, {
    params: { type: type, page: page, limit: limit },
    withCredentials: true,
  });

  if (!Array.isArray(response.data.critics)) {
    return [];
  }

  const parsedData = response.data.critics.map(critic =>
    parseDatabaseData(critic, type, 'critic'),
  );

  return parsedData;
};
