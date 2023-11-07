import axios from 'axios';

export const addLike = async criticId => {
  try {
    await axios.post(
      `http://localhost:8800/api/critics_likes/${criticId}/add`,
      {},
      { withCredentials: true },
    );
  } catch (error) {
    console.log("erreur dans l'ajout du like :", error);
  }
};
