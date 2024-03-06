import axios from 'axios';
import { parseDatabaseData } from '../parseDetails';
import { apiBaseUrl } from '../config';

// Récupération des informations des pépites en commun
export const getCommonNuggetsRequest = async (targetUserId, type) => {
  const response = await axios.get(`${apiBaseUrl}/movies/common_nuggets/${targetUserId}`, {
    params: { type: type },
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
