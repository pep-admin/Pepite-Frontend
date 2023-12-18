import axios from 'axios';
import apiBaseUrl from '../config';

export const updatePassword = async (oldPassword, newPassword) => {
  await axios.patch(
    `${apiBaseUrl}/auth/update_password`,
    { old_password: oldPassword, new_password: newPassword },
    { withCredentials: true },
  );
};
