import axios from 'axios';
import apiBaseUrl from '../config';

// Insertion d'un film dans la liste des déjà vus
export const addSeenMovie = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/movies/add_already_seen`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log("Impossible d'ajouter un film dans la liste de déjà vus");
  }
};

// Suppression d'un film de la liste des déjà vus
export const removeSeenMovie = async (movieId: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/movies/remove_already_seen`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch {
    console.log('Impossible de supprimer un film de la liste de déjà vus');
  }
};

// Déconnexion de l'utilisateur
export const handleLogout = async () => {
  try {
    const logoutResponse = await axios.post(
      'http://localhost:8800/api/auth/logout',
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

// Recherche film / série / personne
export const searchMulti = async (query: string, displayType: string) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/search/movie-serie?query=${query}&displayType=${displayType}`,
      { withCredentials: true },
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

// Insertion d'un film dans la liste des non souhaités
export const addWantedMovie = async (movieId: number, type: string) => {
  try {
    await axios.post(
      `${apiBaseUrl}/movies/add_wanted`,
      { movie_id: movieId, type: type },
      { withCredentials: true },
    );
  } catch {
    console.log(
      "Impossible d'ajouter ce film dans la liste des films non souhaités",
    );
  }
};

// Annulation d'un film souhaité
export const removeWantedMovie = async (movieId: number, type: string) => {
  try {
    await axios.delete(`${apiBaseUrl}/movies/cancel_wanted`, {
      data: { movie_id: movieId, type: type },
      withCredentials: true,
    });
  } catch {
    console.log("Impossible d'annuler un film de la liste des films souhaités");
  }
};
