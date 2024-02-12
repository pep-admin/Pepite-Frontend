import axios from 'axios';
import { apiBaseUrl } from '../config';

export const checkFollowedStatus = async followedId => {
  try {
    const response = await axios.get(`${apiBaseUrl}/followed/check_status`, {
      params: { id: followedId },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log('erreur dans la vérification du statut du suivi :', error);
  }
};
