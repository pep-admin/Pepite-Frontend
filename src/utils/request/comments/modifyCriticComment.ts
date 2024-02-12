import axios from 'axios';
import { apiBaseUrl } from '../config';

export const modifyCriticComment = async (commentId, type, text) => {
  try {
    await axios.put(
      `${apiBaseUrl}/critics_comments/modify/${commentId}`,
      { type: type, text: text },
      { withCredentials: true },
    );
  } catch (error) {
    console.log('impossible de modifier le commentaire', error);
  }
};
