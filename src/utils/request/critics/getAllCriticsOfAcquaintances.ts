import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import apiBaseUrl from '../config';

// Récupération de toutes les critiques des connaissances d'un utilisateur
export const getAllCriticsOfAcquaintances = async (userId, type, page) => {
  const response = await axios.get(
    `${apiBaseUrl}/critics/acquaintances/${userId}`,
    {
      params: { type: type, page: page },
      withCredentials: true,
    },
  );

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(critic =>
    parseDatabaseData(critic, type, 'critic'),
  );

  return parsedData;
};
