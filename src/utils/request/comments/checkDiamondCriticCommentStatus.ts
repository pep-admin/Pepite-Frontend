import axios from 'axios';
import { apiBaseUrl } from '../config';

export const checkDiamondCriticCommentStatus = async (commentId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_comments/${commentId}/check_diamond`,
      { params: { type: type }, withCredentials: true },
    );

    return response.data.isGold;
  } catch (error) {
    console.log(
      'erreur dans la vérification du statut du diamant du commentaire de critique :',
      error,
    );
  }
};
