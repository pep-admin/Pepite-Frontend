import axios from 'axios';
import apiBaseUrl from '../config';

export const addAdviceCommentLike = async (commentId, type) => {
  try {
    await axios.post(
      `${apiBaseUrl}/advices_comments/add_like/${commentId}`,
      { type: type },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du like :", error);
  }
};
