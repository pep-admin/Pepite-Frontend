import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getUser = async userId => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users/user/${userId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("erreur dans la recherche de l'utilisateur :", error);
  }
};
