import axios from 'axios';
import apiBaseUrl from '../config';

export const addLike = async criticId => {
  try {
    await axios.post(
      `${apiBaseUrl}/critics_likes/${criticId}/add`,
      {},
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du like :", error);
  }
};
