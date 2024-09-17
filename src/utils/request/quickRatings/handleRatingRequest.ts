import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle notation rapide
export const handleRatingRequest = async (
  movieId: number,
  type: string,
  rating: number | null,
  isGoldNugget: boolean | null,
  isTurnip: boolean | null,
  validateOrCancel: string
) => {
  
  try {
    // Si l'utilisateur valide la note
    if(validateOrCancel === 'validate') {
      await axios.post(
        `${apiBaseUrl}/quick_ratings/add`,
        { movie_id: movieId, type: type, rating, isGoldNugget, isTurnip },
        { withCredentials: true },
      );
    } 
    // Si l'utilisateur annule la note
    else {
      await axios.delete(`${apiBaseUrl}/quick_ratings/delete`, {
        params: { movie_id: movieId, type: type },
        withCredentials: true,
      });
    }

    return { error: null };

  } catch (error) {    
    console.log(error);
    
    return { error: "Erreur serveur : Impossible d'effectuer l'action." };
  }
};
