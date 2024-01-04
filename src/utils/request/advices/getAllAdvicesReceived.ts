import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import apiBaseUrl from '../config';

// Récupération de toutes les conseils reçus d'un utilisateur
export const getAllAdvicesReceived = async (userId, type) => {
  const response = await axios.get(`${apiBaseUrl}/advices/all/${userId}`, {
    params: { type: type },
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
