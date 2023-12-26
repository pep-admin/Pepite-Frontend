import axios from 'axios';
import apiBaseUrl from '../config';

export const handleFriendship = async (receiverId, choice) => {
  await axios.patch(
    `${apiBaseUrl}/friendship/accept`,
    { receiverId: receiverId, choice: choice },
    { withCredentials: true },
  );
};
