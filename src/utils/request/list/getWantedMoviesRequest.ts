import axios from 'axios';
import { parseDatabaseData } from '../../functions/parseDetails';
import { apiBaseUrl } from '../config';

// Récupération de toutes films / séries souhaitées d'un utilisateur
export const getWantedMoviesRequest = async (userId, type) => {
  const response = await axios.get(`${apiBaseUrl}/list/wanted/${userId}`, {
    params: { type: type },
    withCredentials: true,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(data => parseDatabaseData(data));

  return parsedData;
};
