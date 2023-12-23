import axios from 'axios';
import apiBaseUrl from '../config';

export const checkFriendshipStatus = async receiverId => {
  try {
    const response = await axios.get(`${apiBaseUrl}/friendship/check_status`, {
      params: { id: receiverId },
      withCredentials: true,
    });

    return response.data.status;
  } catch (error) {
    console.log("erreur dans la vérification du statut de l'amitié :", error);
  }
};
