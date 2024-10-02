import axios from 'axios';
import { parseDatabaseData } from '../../functions/parseDetails';
import { apiBaseUrl } from '../config';

// Récupération des conseils reçus d'un utilisateur
export const getAdvicesReceived = async (userId, type, page, limit) => {
  const response = await axios.get(`${apiBaseUrl}/advices/all/${userId}`, {
    params: { type: type, page: page, limit: limit },
    withCredentials: true,
  });

  console.log('la réponse', response.data);

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(critic =>
    parseDatabaseData(critic, type, 'advice'),
  );

  return parsedData;
};
