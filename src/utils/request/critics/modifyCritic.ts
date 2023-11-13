import axios from 'axios';

export const modifyCritic = async (
  criticId,
  type,
  rating,
  text,
  isGoldNugget,
) => {
  await axios.put(
    `http://localhost:8800/api/critics/modify/${criticId}`,
    { rating: rating, type: type, text: text, is_gold_nugget: isGoldNugget },
    { withCredentials: true },
  );
};
