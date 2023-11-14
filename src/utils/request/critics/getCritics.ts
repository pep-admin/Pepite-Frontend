import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';

// Récupération de toutes les critiques d'un utilisateur
export const getAllCriticsOfUser = async (userId, type) => {
  const response = await axios.get(
    `http://localhost:8800/api/critics/all/${userId}`,
    {
      params: { type: type },
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
