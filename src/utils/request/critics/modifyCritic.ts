import axios from 'axios';
import apiBaseUrl from '../config';

export const modifyCritic = async (
  criticId,
  type,
  rating,
  text,
  isGoldNugget,
) => {
  await axios.put(
    `${apiBaseUrl}/critics/modify/${criticId}`,
    { rating: rating, type: type, text: text, is_gold_nugget: isGoldNugget },
    { withCredentials: true },
  );
};
