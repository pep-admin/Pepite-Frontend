import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getFriendsListRequest = async userId => {
    const response = await axios.get(
      `${apiBaseUrl}/friendship/list/${userId}`,
      {
        withCredentials: true,
      },
    );    

    return response.data.results;
};
