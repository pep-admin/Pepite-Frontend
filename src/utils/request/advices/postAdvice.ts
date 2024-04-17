import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle critique // conseil
export const addNewAdvice = async (
  receiverId,
  movieId,
  movieName,
  type,
  rating,
  text,
  isGoldNugget,
) => {
  try {
    await axios.post(
      `${apiBaseUrl}/advices/add`,
      {
        receiver_id: receiverId,
        movie_id: movieId,
        movie_name: movieName,
        type: type,
        rating,
        text,
        isGoldNugget,
      },
      { withCredentials: true },
    );
  } catch (error) {
    console.log('impossible de poster le nouveau conseil:', error);
  }
};
