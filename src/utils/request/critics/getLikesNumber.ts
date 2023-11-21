import axios from 'axios';

export const getLikesNumber = async (criticId, type) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/critics_likes/${criticId}/likes`,
      {
        params: { type: type },
        withCredentials: true,
      },
    );

    return response.data.likesCount;
  } catch (error) {
    console.log('erreur dans le comptage des likes :', error);
  }
};
