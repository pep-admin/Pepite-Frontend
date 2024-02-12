import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle critique // conseil
export const addNewCritic = async (
  movieId,
  type,
  rating,
  text,
  isGoldNugget,
  isTurnip,
) => {
  await axios.post(
    `${apiBaseUrl}/critics/add`,
    { movie_id: movieId, type: type, rating, text, isGoldNugget, isTurnip },
    { withCredentials: true },
  );
};
