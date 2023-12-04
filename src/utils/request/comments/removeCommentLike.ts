import axios from 'axios';
import apiBaseUrl from '../config';

// Suppression d'un like de commentaire
export const removeCommentLike = async (comment_id: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/critics_comments/${comment_id}/remove`, {
      params: { type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};
