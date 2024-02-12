import axios from 'axios';
import { apiBaseUrl } from '../config';

export const recoverOldPic = async (img_id, picType) => {
  await axios.put(
    `${apiBaseUrl}/users/recover/old_pic`,
    { img_id: img_id, picType: picType },
    { withCredentials: true },
  );
};
