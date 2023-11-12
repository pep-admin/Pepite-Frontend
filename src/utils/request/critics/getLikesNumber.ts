import axios from 'axios';
import apiBaseUrl from '../config';

export const getLikesNumber = async (criticId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_likes/${criticId}/likes`,
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
