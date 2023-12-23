import axios from 'axios';
import apiBaseUrl from '../config';

export const getTenUsers = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users/suggestion`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("erreur dans la recherche de l'utilisateur :", error);
  }
};
