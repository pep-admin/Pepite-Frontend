import axios from 'axios';
import { apiBaseUrl } from '../config';

export const checkIfCriticExistsRequest = async (movieId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/critics/check_previous/${movieId}`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    console.log('la réponse', response.data);
    

    return {
      exists: response.data.exists,
      id: response.data.criticId,
    };
  } catch (error) {
    console.log('erreur dans la vérification de la critique :', error);
  }
};
