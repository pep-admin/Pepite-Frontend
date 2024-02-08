import axios from 'axios';
import apiBaseUrl from '../config';

export const addCriticComment = async (critic_id, type, text) => {
  try {
    await axios.post(
      `${apiBaseUrl}/critics_comments/add`,
      { critic_id: critic_id, type: type, text: text },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du commentaire :", error);
  }
};
