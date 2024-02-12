import axios from 'axios';
import { apiBaseUrl } from '../config';

export const checkDiamondCriticStatus = async (criticId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics_diamonds/${criticId}/check_diamond`,
      { params: { type: type }, withCredentials: true },
    );

    return response.data.isGold;
  } catch (error) {
    console.log(
      'erreur dans la vérification du statut de la pépite footer :',
      error,
    );
  }
};
