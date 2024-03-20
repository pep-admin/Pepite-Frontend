import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'un diamant de commentaire de critique
export const removeDiamondCriticComment = async (
  comment_id: number,
  type: string,
) => {
  try {
    await axios.delete(
      `${apiBaseUrl}/critics_comments/remove_diamond/${comment_id}`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );
  } catch {
    console.log(
      'Impossible de supprimer le diamant du commentaire de critique',
    );
  }
};
