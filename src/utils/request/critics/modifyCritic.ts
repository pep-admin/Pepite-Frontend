import axios from 'axios';
import { apiBaseUrl } from '../config';

export const modifyCritic = async (
  criticId,
  type,
  rating,
  text,
  isGoldNugget,
  isTurnip,
) => {
  await axios.put(
    `${apiBaseUrl}/critics/modify/${criticId}`,
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
