import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getFriendRequestList = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/friendship/requests_list`, {
      withCredentials: true,
    });
    console.log(response.data);

    if (response.data === "Aucune demande d'amitié reçue") return [];
    else return response.data;
  } catch (error) {
    console.log("erreur dans la recherche des demandes d'amitié :", error);
  }
};
