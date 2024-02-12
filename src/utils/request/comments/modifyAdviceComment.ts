import axios from 'axios';
import { apiBaseUrl } from '../config';

export const modifyAdviceComment = async (commentId, type, text) => {
  try {
    await axios.put(
      `${apiBaseUrl}/advices_comments/modify/${commentId}`,
      { type: type, text: text },
      { withCredentials: true },
    );
  } catch (error) {
    console.log('impossible de modifier le commentaire', error);
  }
};
