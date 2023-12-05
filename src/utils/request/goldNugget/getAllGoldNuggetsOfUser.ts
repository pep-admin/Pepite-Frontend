import axios from 'axios';
import apiBaseUrl from '../config';

// Récupération de toutes les critiques d'un utilisateur
export const getAllGoldNuggetsOfUser = async (type, userId) => {
  try {    
    const response = await axios.get(`${apiBaseUrl}/gold_nugget/all/${userId}`, {
      params: { type: type },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(
      'erreur dans la récupération des pépites',
      error,
    );
  }
};