import axios from 'axios';
import { apiBaseUrl } from '../config';

export const modifyAdvice = async (
  adviceId,
  type,
  rating,
  text,
  isGoldNugget,
  isTurnip,
) => {
  await axios.put(
    `${apiBaseUrl}/advices/modify/${adviceId}`,
    {
      rating: rating,
      type: type,
      text: text,
      is_gold_nugget: isGoldNugget,
      is_turnip: isTurnip,
    },
    { withCredentials: true },
  );
};
