import axios from 'axios';
import { apiBaseUrl } from '../config';

export const declineFriendship = async receiverId => {
  await axios.delete(`${apiBaseUrl}/friendship/decline`, {
    params: { receiverId: receiverId },
    withCredentials: true,
  });
};
