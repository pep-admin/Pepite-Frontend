import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'un commentaire de conseil
export const deleteAdviceComment = async (comment_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/advices_comments/delete/${comment_id}`, {
      params: { type: type },
      withCredentials: true,
    });
    console.log(`suppression du commentaire n° ${comment_id}`);
  } catch {
    console.log('Impossible de supprimer le commentaire');
  }
};
