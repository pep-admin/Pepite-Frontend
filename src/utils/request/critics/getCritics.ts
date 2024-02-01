import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import apiBaseUrl from '../config';

// Récupération des critiques d'un utilisateur
export const getCriticsOfUser = async (userId, type, page) => {
  const response = await axios.get(`${apiBaseUrl}/critics/all/${userId}`, {
    params: { type: type, page: page },
    withCredentials: true,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(critic =>
    parseDatabaseData(critic, type, 'critic'),
  );

  return parsedData;
};
