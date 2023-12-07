import axios from 'axios';
import apiBaseUrl from '../config';

export const addGold = async (criticId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/critics_gold/${criticId}/add`,
      { type: type },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout de la pépite :", error);
  }
};
