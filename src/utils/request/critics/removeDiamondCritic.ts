import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'un diamant de critique
export const removeDiamondCritic = async (critic_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/critics_diamonds/${critic_id}/remove`, {
      params: { type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};
