import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getTopContributorsRequest = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users/top_contributors`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("erreur dans la récupération des meilleurs contributeurs :", error);
  }
};
