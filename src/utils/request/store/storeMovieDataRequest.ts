import axios from 'axios';
import { apiBaseUrl } from '../config';

export const storeMovieDataRequest = async (movieOrSerie, movie) => {
    console.log('les données à post', movie);
    
  try {
    await axios.post(
      `${apiBaseUrl}/store/data`,
      { type: movieOrSerie, movie: movie,  },
      { withCredentials: true },
    );
  } catch (error) {
    console.log('erreur dans le stockage des données du film =>', error);
    
  }
    
};
