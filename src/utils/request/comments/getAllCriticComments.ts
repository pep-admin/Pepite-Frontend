import axios from 'axios';
import { apiBaseUrl } from '../config';

// Récupération de toutes les commentaires d'une critique
export const getAllCriticComments = async (type, critic_id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/critics_comments/get`, {
      params: { type: type, critic_id: critic_id },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(
      'erreur dans la récupération des commentaires de critique :',
      error,
    );
  }
};
