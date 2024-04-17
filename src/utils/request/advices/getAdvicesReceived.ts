import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import { apiBaseUrl } from '../config';

// Récupération des conseils reçus d'un utilisateur
export const getAdvicesReceived = async (userId, type, page, limit) => {
  const response = await axios.get(`${apiBaseUrl}/advices/all/${userId}`, {
    params: { type: type, page: page, limit: limit },
    withCredentials: true,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(critic =>
    parseDatabaseData(critic, type, 'advice'),
  );

  return parsedData;
};
