import axios from 'axios';
import apiBaseUrl from '../config';

// Déconnexion de l'utilisateur
export const handleLogout = async () => {
  try {
    const logoutResponse = await axios.post(
      `${apiBaseUrl}/auth/logout`,
      {},
      { withCredentials: true },
    );
    if (logoutResponse.status !== 200) {
      throw new Error('Déconnexion impossible');
    }
  } catch (err) {
    console.error('Erreur durant la déconnexion :', err.message);
  }
};

// Insertion d'un film dans la liste des non souhaités
export const addUnwantedMovie = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/movies/unwanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log(
      "Impossible d'ajouter ce film dans la liste des films non souhaités",
    );
  }
};

// Annulation d'un film non souhaité
export const cancelDeletedMovie = async (movieId: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/movies/cancel_deleted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch {
    console.log(
      "Impossible d'annuler un film de la liste des films non souhaités",
    );
  }
};
