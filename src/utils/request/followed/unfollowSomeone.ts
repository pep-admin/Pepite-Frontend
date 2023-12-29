import axios from 'axios';
import apiBaseUrl from '../config';

export const unfollowSomeone = async followedId => {
  await axios.delete(`${apiBaseUrl}/followed/unfollow`, {
    params: { followedId: followedId },
    withCredentials: true,
  });
};
