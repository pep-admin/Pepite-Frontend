import axios from 'axios';
import apiBaseUrl from '../config';

export const getFriendsList = async userId => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/friendship/list/${userId}`,
      {
        withCredentials: true,
      },
    );

    if (response.data === "Il n'y a encore aucun ami dans la liste.") return [];
    else return response.data;
  } catch (error) {
    console.log("erreur dans la récupération de la liste d'amis :", error);
  }
};
