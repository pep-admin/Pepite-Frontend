import axios from 'axios';
import apiBaseUrl from '../config';

export const getGoldNumber = async (criticId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_gold/${criticId}/gold`,
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
