import axios from 'axios';
import apiBaseUrl from '../config';

export const handleCloseFriendRequest = async (receiverId, choice) => {
  await axios.patch(
    `${apiBaseUrl}/friendship/handle_close`,
    { receiverId: receiverId, choice: choice },
    { withCredentials: true },
  );
};
