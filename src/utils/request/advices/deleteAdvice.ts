import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'un conseil
export const deleteAdvice = async (advice_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/advices/delete/${advice_id}`, {
      params: { type: type },
      withCredentials: true,
    });
    console.log(`suppression du conseil ${advice_id}`);
  } catch {
    console.log('Impossible de supprimer le conseil');
  }
};
