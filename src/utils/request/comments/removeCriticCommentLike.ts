import axios from 'axios';
import apiBaseUrl from '../config';

// Suppression d'un like de commentaire de critique
export const removeCriticCommentLike = async (
  comment_id: number,
  type: string,
) => {
  try {
    await axios.delete(`${apiBaseUrl}/critics_comments/${comment_id}/remove`, {
      params: { type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de retirer le like de commentaire');
  }
};
