import axios from 'axios';
import { apiBaseUrl } from '../config';

export const getUserInteractionRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/contacts/interaction_list`, {
      withCredentials: true,
    });

    return response.data;
};
