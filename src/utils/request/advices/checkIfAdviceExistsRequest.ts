import axios from 'axios';
import { apiBaseUrl } from '../config';

export const checkIfAdviceExistsRequest = async (movieId, type) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/advices/check_previous/${movieId}`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return {
      exists: response.data.exists,
      id: response.data.adviceId,
    };
  } catch (error) {
    console.log(
      "erreur dans la vérification de l'existance du conseil :",
      error,
    );
  }
};
