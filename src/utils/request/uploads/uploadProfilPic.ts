import axios from 'axios';
import apiBaseUrl from '../config';

// Ajout d'une nouvelle critique
export const uploadProfilPic = async newFile => {
  const formData = new FormData();
  formData.append('profilePic', newFile);

  await axios.post(`${apiBaseUrl}/users/modify/profil_pic`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
};
