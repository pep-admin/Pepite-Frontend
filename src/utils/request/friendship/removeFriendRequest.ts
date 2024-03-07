import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'une personne de la liste d'amis
export const removeFriendRequest = async receiverId => {
  try {
    await axios.delete(`${apiBaseUrl}/friendship/remove`, {
      params: { receiverId: receiverId },
      withCredentials: true,
    });
  } catch(error) {
    console.log("Impossible de retirer la personne de la liste d'amis", error);
  }
};
