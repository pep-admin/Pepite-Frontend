import axios from 'axios';
import apiBaseUrl from '../config';

// Comptage des diamants d'une critique
export const getDiamondsCriticNumber = async (criticId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_diamonds/${criticId}/diamond`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data.goldCount;
  } catch (error) {
    console.log('erreur dans le comptage des pépites :', error);
  }
};
