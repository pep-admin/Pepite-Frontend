import axios from 'axios';
import { apiBaseUrl } from '../config';

export const handleFollowedRequest = async (follow: boolean, followed_id: number) => {

  if(follow) {
    await axios.post(
      `${apiBaseUrl}/followed/follow`,
      { followed_id: followed_id },
      { withCredentials: true },
    );
  } else {
    await axios.delete(`${apiBaseUrl}/followed/unfollow`, {
      params: { followed_id: followed_id },
      withCredentials: true,
    });
  }

};
