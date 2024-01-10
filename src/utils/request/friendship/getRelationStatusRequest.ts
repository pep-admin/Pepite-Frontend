import axios from 'axios';
import apiBaseUrl from '../config';

export const getRelationStatusRequest = async userTargetId => {
  try {
    const response = await axios.get(`${apiBaseUrl}/friendship/status`, {
      params: { id: userTargetId },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(
      'erreur dans la vérification du statut de la relation :',
      error,
    );
  }
};
