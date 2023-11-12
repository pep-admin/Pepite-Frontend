import axios from 'axios';
import apiBaseUrl from '../config';

export const checkLikeStatus = async (criticId, type) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/critics_likes/${criticId}/check_like`,
      { params: { type: type }, withCredentials: true },
    );

    return response.data.hasLiked;
  } catch (error) {
    console.log('erreur dans le comptage des likes :', error);
  }
};
