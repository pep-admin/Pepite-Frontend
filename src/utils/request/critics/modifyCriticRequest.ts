import axios from 'axios';
import { apiBaseUrl } from '../config';

export const modifyCriticRequest = async (
  criticId: number,
  type: string,
  rating: number,
  text: string,
  isGoldNugget: boolean,
  isTurnip: boolean,
  isPrivate: boolean,
) => {
  await axios.put(
    `${apiBaseUrl}/critics/modify/${criticId}`,
    {
      rating: rating,
      type: type,
      text: text,
      is_gold_nugget: isGoldNugget,
      is_turnip: isTurnip,
      isPrivate: isPrivate,
    },
    { withCredentials: true },
  );
};
