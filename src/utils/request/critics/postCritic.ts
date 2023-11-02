import axios from 'axios';

// Ajout d'une nouvelle critique
export const addNewCritic = async (
  movieId,
  type,
  rating,
  text,
  isGoldNugget,
) => {
  await axios.post(
    `http://localhost:8800/api/critics/add`,
    { movie_id: movieId, type: type, rating, text, isGoldNugget },
    { withCredentials: true },
  );
};
