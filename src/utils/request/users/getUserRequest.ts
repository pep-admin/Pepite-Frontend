import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getUserRequest = async userId => {
  const response = await axios.get(`${apiBaseUrl}/users/user/${userId}`, {
    withCredentials: true,
  });

  return response.data;
};
