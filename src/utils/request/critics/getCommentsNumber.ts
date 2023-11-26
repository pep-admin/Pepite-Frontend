import axios from 'axios';

export const getCommentsNumber = async (criticId, type) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/critics_comments/${criticId}/comments`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data.commentsCount;
  } catch (error) {
    console.log('erreur dans le comptage des commentaires :', error);
  }
};
