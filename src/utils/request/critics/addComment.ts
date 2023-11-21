import axios from 'axios';

export const addComment = async (critic_id, type, text) => {
  try {
    await axios.post(
      `http://localhost:8800/api/critics_comments/add`,
      { critic_id: critic_id, type: type, text: text },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du commentaire :", error);
  }
};
