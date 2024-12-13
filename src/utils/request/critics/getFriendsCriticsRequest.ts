import axios from 'axios';
import { parseDatabaseData } from '../../functions/parseDetails';
import { apiBaseUrl } from '../config';

// Récupération de toutes les critiques des connaissances d'un utilisateur
export const getFriendsCriticsRequest = async (page: number, type: string) => {
  const response = await axios.get(`${apiBaseUrl}/critics/friends`, {
    params: { page: page, type: type },
    withCredentials: true,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(critic =>
    parseDatabaseData(critic),
  );

  return parsedData;
};
