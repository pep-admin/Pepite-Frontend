import axios from 'axios';
import apiBaseUrl from '../config';

export const addDiamondAdvice = async (adviceId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/advices_diamonds/${adviceId}/add`,
      { type: type },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du diamant :", error);
  }
};
