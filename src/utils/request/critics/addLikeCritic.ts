import axios from 'axios';
import { apiBaseUrl } from '../config';

export const addLikeCritic = async (criticId, type) => {
  try {
    await axios.post(
      `${apiBaseUrl}/critics_likes/${criticId}/add`,
      { type: type },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du like :", error);
  }
};
