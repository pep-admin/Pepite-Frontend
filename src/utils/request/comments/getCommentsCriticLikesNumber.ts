import axios from 'axios';
import apiBaseUrl from '../config';

export const getCommentsCriticLikesNumber = async (commentId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_comments/${commentId}/likes`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data.likesCount;
  } catch (error) {
    console.log('erreur dans le comptage des likes :', error);
  }
};
