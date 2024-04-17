import axios from 'axios';
import { apiBaseUrl } from '../config';

export const markNotificationsAsRead = async () => {
  await axios.patch(
    `${apiBaseUrl}/notifications/read`,
    {},
    { withCredentials: true },
  );
};
