import axios from 'axios';
import { apiBaseUrl } from '../config';

// Suppression d'une personne de la liste d'amis
export const cancelFriendShip = async receiverId => {
  try {
    await axios.delete(`${apiBaseUrl}/friendship/cancel`, {
      params: { receiverId: receiverId },
      withCredentials: true,
    });
  } catch {
    console.log("Impossible d'annuler la demande d'amitié.");
  }
};
