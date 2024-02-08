import axios from 'axios';
import apiBaseUrl from '../config';

export const getAdviceCommentsNumber = async (adviceId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices_comments/${adviceId}/comments`,
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
