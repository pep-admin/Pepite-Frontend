import axios from 'axios';
import { apiBaseUrl } from '../config';

export const checkLikeAdviceStatus = async (adviceId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices_likes/${adviceId}/check_like`,
      { params: { type: type }, withCredentials: true },
    );

    return response.data.hasLiked;
  } catch (error) {
    console.log('erreur dans la vérification du statut du like :', error);
  }
};
