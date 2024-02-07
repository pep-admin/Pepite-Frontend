import axios from 'axios';
import apiBaseUrl from '../config';

// Suppression d'un like de critique
export const removeLikeCritic = async (critic_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/critics_likes/${critic_id}/remove`, {
      params: { type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de retirer le like de la critique');
  }
};
