import axios from 'axios';
import apiBaseUrl from '../config';

// Suppression d'un film de la liste des déjà vus
export const removeLike = async (critic_id: number) => {
  try {
    await axios.delete(`${apiBaseUrl}/critics_likes/${critic_id}/remove`, {
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};
