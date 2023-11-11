import axios from 'axios';

export const checkLikeStatus = async criticId => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/critics_likes/${criticId}/check_like`,
      { withCredentials: true },
    );

    return response.data.hasLiked;
  } catch (error) {
    console.log('erreur dans le comptage des likes :', error);
  }
};
