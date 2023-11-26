import axios from 'axios';
import apiBaseUrl from '../config';

// Récupération de toutes les critiques d'un utilisateur
export const getVideo = async (type, movieId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movies/video/${movieId}`, {
      params: { type: type },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(
      'erreur dans la récupération des commentaires de critique :',
      error,
    );
  }
};
