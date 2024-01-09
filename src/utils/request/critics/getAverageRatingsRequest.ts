import axios from 'axios';
import apiBaseUrl from '../config';

export const getAverageRatingsRequest = async movieId => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics/average_rating/${movieId}`,
      {
        withCredentials: true,
      },
    );

    const ratingFloat = parseFloat(response.data.average_rating);
    const ratingFixed = ratingFloat.toFixed(1);

    return ratingFixed;
  } catch (error) {
    console.log('erreur dans la récupération de la moyenne du film :', error);
  }
};
