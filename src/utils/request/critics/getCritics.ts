import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import apiBaseUrl from '../config';

// Récupération de toutes les critiques d'un utilisateur
export const getAllCriticsOfUser = async userId => {
  const response = await axios.get(`${apiBaseUrl}/critics/all/${userId}`, {
    withCredentials: true,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(critic =>
    parseDatabaseData(critic, 'critic'),
  );

  return parsedData;
};
