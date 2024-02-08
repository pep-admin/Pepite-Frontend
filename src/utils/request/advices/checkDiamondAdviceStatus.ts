import axios from 'axios';
import apiBaseUrl from '../config';

export const checkDiamondAdviceStatus = async (adviceId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices_diamonds/${adviceId}/check_diamond`,
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
