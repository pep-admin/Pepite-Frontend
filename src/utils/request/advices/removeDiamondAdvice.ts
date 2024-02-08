import axios from 'axios';
import apiBaseUrl from '../config';

// Suppression d'un diamant de conseil
export const removeDiamondAdvice = async (advice_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/advices_diamonds/${advice_id}/remove`, {
      params: { type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};
