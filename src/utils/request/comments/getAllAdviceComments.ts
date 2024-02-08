import axios from 'axios';
import apiBaseUrl from '../config';

// Récupération de toutes les commentaires d'un conseil
export const getAllAdviceComments = async (type, advice_id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/advices_comments/get`, {
      params: { type: type, advice_id: advice_id },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(
      'erreur dans la récupération des commentaires de critique :',
      error,
    );
  }
};
