import axios from 'axios';
import apiBaseUrl from '../config';

export const handleFriendship = async (receiverId, choice) => {
  await axios.patch(
    `${apiBaseUrl}/friendship/handle_request`,
    { receiverId: receiverId, choice: choice },
    { withCredentials: true },
  );
};
