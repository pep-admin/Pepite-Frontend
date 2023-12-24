import axios from 'axios';
import apiBaseUrl from '../config';

export const validateFriendship = async receiverId => {
  await axios.patch(
    `${apiBaseUrl}/friendship/accept`,
    { receiverId: receiverId },
    { withCredentials: true },
  );
};
