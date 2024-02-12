import axios from 'axios';
import { apiBaseUrl } from '../config';

export const acceptFriendship = async receiverId => {
  await axios.patch(
    `${apiBaseUrl}/friendship/accept`,
    { receiverId: receiverId },
    { withCredentials: true },
  );
};
