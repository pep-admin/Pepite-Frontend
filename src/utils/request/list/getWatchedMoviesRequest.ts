import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import { apiBaseUrl } from '../config';

// Récupération de toutes films / séries déjà vus d'un utilisateur
export const getWatchedMoviesRequest = async (userId, type) => {
  const response = await axios.get(`${apiBaseUrl}/list/watched/${userId}`, {
    params: { type: type },
    withCredentials: true,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(data =>
    parseDatabaseData(data, type, 'list'),
  );

  return parsedData;
};
