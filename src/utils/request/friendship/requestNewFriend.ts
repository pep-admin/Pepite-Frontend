import axios from 'axios';
import apiBaseUrl from '../config';

export const requestNewFriend = async receiver_id => {
  try {
    await axios.post(
      `${apiBaseUrl}/friendship/add`,
      { receiver_id: receiver_id },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans la demande d'amitié :", error);
  }
};
