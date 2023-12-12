import axios from 'axios';
import apiBaseUrl from '../config';

export const recoverOldPic = async img_id => {
  await axios.put(
    `${apiBaseUrl}/users/recover/profil_pic`,
    { img_id: img_id },
    { withCredentials: true },
  );
};
