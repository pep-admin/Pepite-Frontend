import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle critique
export const postCriticRequest = async (
  movieId: number,
  isMovieOrSerie: string,
  rating: number,
  text: string,
  isGoldNugget: boolean,
  isTurnip: boolean,
  isPrivate: boolean
) => {

  const response = await axios.post(
    `${apiBaseUrl}/critics/add`,
    { movie_id: movieId, 
      type: isMovieOrSerie, 
      rating: rating, 
      text: text,
      isGoldNugget: isGoldNugget,
      isTurnip: isTurnip,
      isPrivate: isPrivate
    },
    { withCredentials: true },
  );
  
  return response.data;
};
