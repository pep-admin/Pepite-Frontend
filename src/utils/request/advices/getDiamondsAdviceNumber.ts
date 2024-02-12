import axios from 'axios';
import { apiBaseUrl } from '../config';

// Comptage des diamants d'un conseil
export const getDiamondsAdviceNumber = async (adviceId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices_diamonds/${adviceId}/diamond`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data.goldCount;
  } catch (error) {
    console.log('erreur dans le comptage des diamants du conseil :', error);
  }
};
