import axios from 'axios';
import apiBaseUrl from '../config';

// Suppression d'une critique
export const deleteCritic = async (critic_id: number) => {
  try {
    await axios.delete(`${apiBaseUrl}/critics/delete/${critic_id}`, {
      withCredentials: true,
    });
    console.log(`suppression de la critique ${critic_id}`);
  } catch {
    console.log('Impossible de supprimer la critique');
  }
};
