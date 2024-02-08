import axios from 'axios';
import apiBaseUrl from '../config';

// Suppression d'un like d'un conseil
export const removeLikeAdvice = async (advice_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/advices_likes/${advice_id}/remove`, {
      params: { type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de retirer le like du conseil');
  }
};
