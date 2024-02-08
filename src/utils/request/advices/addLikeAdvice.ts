import axios from 'axios';
import apiBaseUrl from '../config';

export const addLikeAdvice = async (adviceId, type) => {
  try {
    await axios.post(
      `${apiBaseUrl}/advices_likes/${adviceId}/add`,
      { type: type },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du like :", error);
  }
};
