import axios from 'axios';
import { apiBaseUrl } from '../config';

// Comptage des diamants d'un commentaire de conseil
export const getDiamondsAdviceCommentNumber = async (commentId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices_comments/${commentId}/diamonds`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data.goldCount;
  } catch (error) {
    console.log('erreur dans le comptage des diamants du commentaire :', error);
  }
};
