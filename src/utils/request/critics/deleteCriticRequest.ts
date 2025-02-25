import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'une critique
export const deleteCriticRequest = async (critic_id: number, type: string) => {
  await axios.delete(`${apiBaseUrl}/critics/delete/${critic_id}`, {
    params: { type: type },
    withCredentials: true,
  });
  return { message: `a été retiré de votre liste.` };
};
