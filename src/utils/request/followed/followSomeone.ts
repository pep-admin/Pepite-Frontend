import axios from 'axios';
import apiBaseUrl from '../config';

export const followSomeone = async followedId => {
  await axios.post(
    `${apiBaseUrl}/followed/follow`,
    { followedId: followedId },
    { withCredentials: true },
  );
};
