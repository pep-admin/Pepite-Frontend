import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle notation rapide
export const addNewQuickRating = async (
  movieId,
  type,
  rating,
  isGoldNugget,
  isTurnip,
) => {
  await axios.post(
    `${apiBaseUrl}/quick_ratings/add`,
    { movie_id: movieId, type: type, rating, isGoldNugget, isTurnip },
    { withCredentials: true },
  );
};
