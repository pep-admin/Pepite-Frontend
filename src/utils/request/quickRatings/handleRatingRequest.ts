import axios from 'axios';
import { apiBaseUrl } from '../config';

// Ajout d'une nouvelle notation rapide
export const handleRatingRequest = async (
  movieId: number,
  type: string,
  rating: number,
  isGoldNugget: boolean,
  isTurnip: boolean,
  isRated: boolean
) => {
  try {
    console.log('nouvelle note =>', isRated);

    if(isRated) {
      
      await axios.post(
        `${apiBaseUrl}/quick_ratings/add`,
        { movie_id: movieId, type: type, rating, isGoldNugget, isTurnip },
        { withCredentials: true },
      );
    } else {
  
    }

    return { error: null };

  } catch (error) {    
    return { error: "Erreur serveur : Impossible d'effectuer l'action." };
  }
};
