import axios from 'axios';
import apiBaseUrl from '../config';

// Vérifie si l'utilisateur souhaite voir le film, l'a déjà vu, ou l'a déjà noté
export const getUserMovieStatusRequest = async (movieId, type) => {
  const response = await axios.get(`${apiBaseUrl}/list/check/${movieId}`, {
    params: { type: type },
    withCredentials: true,
  });

  return response.data;
};
