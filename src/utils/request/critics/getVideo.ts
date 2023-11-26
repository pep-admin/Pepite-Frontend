import axios from 'axios';

// Récupération de toutes les critiques d'un utilisateur
export const getVideo = async (type, movieId) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/movies/video/${movieId}`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    console.log(
      'erreur dans la récupération des commentaires de critique :',
      error,
    );
  }
};
