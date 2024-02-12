import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'une critique
export const deleteCriticComment = async (comment_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/critics_comments/delete/${comment_id}`, {
      params: { type: type },
      withCredentials: true,
    });
    console.log(`suppression du commentaire n° ${comment_id}`);
  } catch {
    console.log('Impossible de supprimer le commentaire');
  }
};
