import axios from 'axios';
import apiBaseUrl from '../config';

export const modifyComment = async (commentId, type, text) => {
  await axios.put(
    `${apiBaseUrl}/critics_comments/modify/${commentId}`,
    { type: type, text: text },
    { withCredentials: true },
  );
};
