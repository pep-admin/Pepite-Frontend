import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getRatingsRequest = async (movieId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics/average_rating/${movieId}`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    const ratingFloat = parseFloat(response.data.average_rating);
    const ratingFixed = ratingFloat.toFixed(1);
    const individualRatings = response.data.individual_ratings;
    const ratings = {
      average_rating: ratingFixed,
      individual_ratings: individualRatings,
    };
    console.log('les notes', ratings);

    return ratings;
  } catch (error) {
    console.log('erreur dans la récupération de la moyenne du film :', error);
  }
};
