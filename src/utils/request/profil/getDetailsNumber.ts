import axios from 'axios';
import apiBaseUrl from '../config';

// Comptage des pépites footer
export const getDetailsNumber = async userId => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/users/count_critics/${userId}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log('erreur dans le comptage des critiques :', error);
  }
};
