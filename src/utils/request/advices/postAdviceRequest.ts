import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle critique // conseil
export const postAdviceRequest = async (
  receiverId: number,
  receiver_fullName: string,
  movieId: number,
  movieTitle: string,
  type: string,
  rating: number,
  text: string,
  isGoldNugget: boolean,
  isTurnip: boolean,
) => {
  const response = await axios.post(
    `${apiBaseUrl}/advices/add`,
    {
      receiver_id: receiverId,
      receiver_fullname: receiver_fullName,
      movie_id: movieId,
      movie_title: movieTitle,
      type: type,
      rating: rating,
      text: text,
      is_gold_nugget: isGoldNugget,
      is_turnip: isTurnip,
    },
    { withCredentials: true },
  );

  return response.data;
};
