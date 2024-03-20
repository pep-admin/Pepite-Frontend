import axios from 'axios';
import { apiBaseUrl } from '../config';

export const addDiamondAdviceComment = async (
  commentId: number,
  type: string,
) => {
  try {
    await axios.post(
      `${apiBaseUrl}/advices_comments/add_diamond/${commentId}`,
      { type: type },
      { withCredentials: true },
    );
  } catch (error) {
    console.log(
      "erreur dans l'ajout du diamant de commentaire de conseil :",
      error,
    );
  }
};
