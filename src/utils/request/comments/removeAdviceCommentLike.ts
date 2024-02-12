import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'un like de commentaire de conseil
export const removeAdviceCommentLike = async (
  comment_id: number,
  type: string,
) => {
  try {
    await axios.delete(`${apiBaseUrl}/advices_comments/${comment_id}/remove`, {
      params: { type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de retirer le like de commentaire');
  }
};
