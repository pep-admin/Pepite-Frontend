import axios from 'axios';
import apiBaseUrl from '../config';

// Insertion d'un film dans la liste des non souhaités
export const addUnwantedMovie = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/list/unwanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log(
      "Impossible d'ajouter ce film dans la liste des films non souhaités",
    );
  }
};
