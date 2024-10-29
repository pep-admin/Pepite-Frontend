import axios from 'axios';
import { apiBaseUrl } from '../config';

export const modifyAdviceRequest = async (
  adviceId: number,
  movieId: number,
  receiverId: number,
  type: string,
  rating: number,
  text: string,
  isGoldNugget: boolean,
  isTurnip: boolean,
) => {
  await axios.put(
    `${apiBaseUrl}/advices/modify/${adviceId}`,
    {
      movie_id: movieId,
      receiver_id: receiverId,
      rating: rating,
      type: type,
      text: text,
      is_gold_nugget: isGoldNugget,
      is_turnip: isTurnip,
    },
    { withCredentials: true },
  );
};
