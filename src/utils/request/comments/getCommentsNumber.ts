import axios from 'axios';
import apiBaseUrl from '../config';

export const getCommentsNumber = async (criticId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_comments/${criticId}/comments`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data.commentsCount;
  } catch (error) {
    console.log('erreur dans le comptage des commentaires :', error);
  }
};
