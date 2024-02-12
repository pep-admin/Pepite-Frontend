import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getAdviceLikesNumber = async (adviceId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices_likes/${adviceId}/likes`,
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
