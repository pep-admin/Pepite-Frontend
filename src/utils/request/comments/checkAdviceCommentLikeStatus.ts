import axios from 'axios';
import apiBaseUrl from '../config';

export const checkAdviceCommentLikeStatus = async (commentId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices_comments/${commentId}/check_like`,
      { params: { type: type }, withCredentials: true },
    );

    return response.data.hasLiked;
  } catch (error) {
    console.log('erreur dans le comptage des likes :', error);
  }
};
