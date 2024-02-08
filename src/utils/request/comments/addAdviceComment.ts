import axios from 'axios';
import apiBaseUrl from '../config';

export const addAdviceComment = async (advice_id, type, text) => {
  try {
    await axios.post(
      `${apiBaseUrl}/advices_comments/add`,
      { advice_id: advice_id, type: type, text: text },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du commentaire :", error);
  }
};
