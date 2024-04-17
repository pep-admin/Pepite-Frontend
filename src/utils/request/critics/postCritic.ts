import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle critique
export const addNewCritic = async (
  movieId,
  type,
  rating,
  text,
  isGoldNugget,
  isTurnip,
) => {
  try {
    await axios.post(
      `${apiBaseUrl}/critics/add`,
      { movie_id: movieId, type: type, rating, text, isGoldNugget, isTurnip },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout de la critique :", error);
  }
};
