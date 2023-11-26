import axios from 'axios';

// Récupération de toutes les critiques d'un utilisateur
export const getAllCriticComments = async (type, critic_id) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/critics_comments/get`,
      {
        params: { type: type, critic_id: critic_id },
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
