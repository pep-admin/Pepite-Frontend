import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import { apiBaseUrl } from '../config';

// Récupération des conseils reçus d'un utilisateur
export const getAdvicesReceived = async (userId, type, page) => {
  const response = await axios.get(`${apiBaseUrl}/advices/all/${userId}`, {
    params: { type: type, page: page },
    withCredentials: true,
  });

  // console.log('la réponse', response.data);

  if (!Array.isArray(response.data)) {
    return [];
  }

  const parsedData = response.data.map(critic =>
    parseDatabaseData(critic, type, 'advice'),
  );

  return parsedData;
};
