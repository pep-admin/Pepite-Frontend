import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle critique // conseil
export const addNewAdvice = async (
  receiverId,
  movieId,
  type,
  rating,
  text,
  isGoldNugget,
) => {
  await axios.post(
    `${apiBaseUrl}/advices/add`,
    {
      receiver_id: receiverId,
      movie_id: movieId,
      type: type,
      rating,
      text,
      isGoldNugget,
    },
    { withCredentials: true },
  );
};
