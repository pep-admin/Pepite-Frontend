import axios from 'axios';
import { apiBaseUrl } from '../config';

export const modifyUserName = async (
  name_type: string,
  first_name: string,
  last_name: string,
) => {
  await axios.put(
    `${apiBaseUrl}/users/modify/${name_type}`,
    { name_type: name_type, first_name: first_name, last_name: last_name },
    { withCredentials: true },
  );
};
