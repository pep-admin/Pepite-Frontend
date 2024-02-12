import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération des informations de progression et de rang d'un utilisateur
export const getUserRankRequest = async userId => {
  try {
    const response = await axios.get(`${apiBaseUrl}/rank/infos/${userId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log('erreur dans la récupération des informations de grade', error);
  }
};
