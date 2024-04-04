import axios from 'axios';
import { apiBaseUrl } from '../config';

/* Récupération des notifications de l'utilisateur connecté :
  - Nouvelles demandes d'amitié
  - Demandes d'amitié acceptées
  - Nouveau conseil de film
  - Nouveau conseil de série
*/

export const getNotificationsRequest = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/notifications/all`,
      {
        withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    console.log('erreur dans la récupération des notifications', error);
  }
};