import axios from 'axios';
import apiBaseUrl from '../config';

export const getFollowedList = async userId => {
  try {
    const response = await axios.get(`${apiBaseUrl}/followed/list/${userId}`, {
      withCredentials: true,
    });

    if (response.data === "Il n'y a encore aucun suivi dans la liste.")
      return [];
    else return response.data;
  } catch (error) {
    console.log('erreur dans la récupération de la liste des suivis :', error);
  }
};
